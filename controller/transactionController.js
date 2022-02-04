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
    let ids = req.body.id;
    let transactionsToReturn = [];
    let quantity = req.body.quantity;
    for(let i = 0; i < ids.length; i++){
        let transactionToSell = await Transaction.findOne({
            where: {
                id: ids[i]
            }
        });
        console.log(transactionToSell.dataValues, "to sell ----------")
        let amount = 0;
        let newQuantity = 0;
        if(transactionToSell.dataValues.quantityAvailable <= 0){
            continue
        }
        if(quantity <= transactionToSell.dataValues.quantity){
            amount = quantity * transactionToSell.dataValues.pricePerUnit;
            newQuantity = transactionToSell.dataValues.quantityAvailable - quantity;
        } else {
            amount = transactionToSell.dataValues.quantity * transactionToSell.dataValues.pricePerUnit;
            newQuantity = 0;
            quantity -= transactionToSell.dataValues.quantity
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
        transactionsToReturn.push(transactionToReturn)
        console.log("------------ PASSED")
    }

    return (transactionsToReturn)
}