import db from "../models/index.js";

const Transaction = db.Transaction;

//GET
export const getTransactions = async (req, res) => {
    let transactions = await Transaction.findAll({}).catch(err => err);
    res.json(transactions);
}

//GET
export const getUserTransaction = async (req, res) => {
    let transaction = await Transaction.findAll({
        where: {CustomerId: req.params.id}
    }).catch(err => err);
    res.json(transaction);
}

//POST
export const createTransaction = async (req, res) => {
    if(req.body.type === 'deposit'){
        let transaction = await Transaction.create(req.body);
        return transaction
    } else if(req.body.type === 'purchase'){
        req.body.amount = (req.body.quantity * req.body.pricePerUnit).toFixed(2);
        req.body.quantityAvailable = req.body.quantity;
        let wallet = await db.Wallet.findOne({
            where: {
                CustomerId: req.body.CustomerId
            }
        })
        if((wallet.currencyAmount - req.body.amount) < 0){
            console.log("------------ STOPPED")
            res.json({error: "You do not have the funds to make this purchase. Please add money to your wallet."})
        } else {
            let transaction = await Transaction.create(req.body);
            return transaction;
        }
    } else if(req.body.type === "sell"){
        let transaction = await Transaction.create(req.body);
        res.json(transaction)
    } else {
        res.json({error: "Charge type not provided"})
    }
}

export const sellFund = async (req, res) => {
    //Expect a transaction id to sell
    //expect quantity to sell, if not all
    //calculate amount
    let message = {note: ""};
    let transactionToSell = await Transaction.findOne({
        where: {
            id: req.body.id
        }
    });
    console.log(transactionToSell.dataValues, "to sell ----------")
    if(req.body.quantity > transactionToSell.dataValues.quantityAvailable){
        req.body.quantity = transactionToSell.dataValues.quantityAvailable;
        message.note = `You have ${transactionToSell.dataValues.quantityAvailable} shares available to sell which is less than the quantity provided for this fund. We've adjusted the quantity to sell the remaining shares.`
        // res.json({error: `You have ${transactionToSell.dataValues.quantityAvailable} shares available to sell which is less than quantity provided. Please enter correct quantity`});
    }
    let amount = 0;
    let newQuantity = 0;
    if(transactionToSell.dataValues.quantityAvailable <= 0){
        res.json({error: "You already sold all shares of "+transactionToSell.itemDescription})
    }
    if(req.body.quantity <= transactionToSell.dataValues.quantity){
        amount = req.body.quantity * transactionToSell.dataValues.pricePerUnit;
        newQuantity = transactionToSell.dataValues.quantityAvailable - req.body.quantity;
    } else {
        amount = transactionToSell.dataValues.quantity * transactionToSell.dataValues.pricePerUnit;
        newQuantity = 0;
    }
    console.log(newQuantity,"NEW------------ PASSED")

    if(newQuantity > 0){
        await Transaction.update({
            quantityAvailable: newQuantity
        }, {
            where: {
                id: transactionToSell.dataValues.id
            }
        })
    } else if(newQuantity === 0) {
        await Transaction.update({
            sold: true,
            quantityAvailable: 0
        }, {
            where: {
                id: transactionToSell.dataValues.id
            }
        })
    }
    console.log("------------ PASSED")

    let transactionToReturn = await Transaction.create({
        CustomerId: transactionToSell.dataValues.CustomerId,
        type: "sell",
        itemDescription: `Selling of ${transactionToSell.dataValues.itemDescription}`,
        amount: amount,
        quantity: req.body.quantity,
        fund_id: transactionToSell.dataValues.fund_id,
        pricePerUnit: transactionToSell.dataValues.pricePerUnit,
        sold: true
    })
    console.log("------------ PASSED")
    if(message.note){
        transactionToReturn.note = message.note
    }
    return (transactionToReturn)
}