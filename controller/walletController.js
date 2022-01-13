import db from "../models/index.js";

const Wallet = db.Wallet;


//GET
export const getWallets = async (req, res) => {
    let wallets = await Wallet.findAll({});
    res.json(wallets);
}

//GET
export const getUserWallet = async (req, res) => {
    let wallet = await Wallet.findOne({
        where: {CustomerId: req.params.id}
    });
    res.json(wallet);
}

//POST
export const createWallet = async (req, res) => {
    let customerExists = await db.Customer.findOne({
        where: {
            id: req.body.CustomerId
        }
    });
    let walletExists = await Wallet.findOne({
        where: {CustomerId: req.body.CustomerId}
    }); 
    if(!customerExists){
        res.json({error: "Customer does not exist yet. Please create a customer profile."})
    }
    if(walletExists){
        res.json({error: "Wallet already exists for customer."})
    } else {
        let wallet = await Wallet.create(req.body);
        res.json(wallet);
    }
}

//PATCH
//Could be swapped with Swipe API 
export const chargeOneWallet = async(req, res, transaction) => {
    console.log(req.body);
    //incoming charge body = {CustomerId, incomingCharge}
    let wallet = await Wallet.findOne({
        where: {CustomerId: transaction.dataValues.CustomerId}
    });
    let newBalance =  wallet.currencyAmount - transaction.dataValues.amount;
    await Wallet.update({currencyAmount: newBalance}, {
        where: {id: wallet.id}
    })
    return ({charged: req.body.amount, newBalance: newBalance});
}

export const depositOneWallet = async(req, res, transaction) => {
    console.log("----wallet", transaction)
    //incoming body = {CustomerId, deposit}
    let wallet = await Wallet.findOne({
        where: {CustomerId: transaction.dataValues.CustomerId}
    });
    let newBalance =  (wallet.currencyAmount + transaction.dataValues.amount).toFixed(2);
    await Wallet.update({currencyAmount: newBalance}, {
        where: {CustomerId: wallet.CustomerId}
    })
    return ({deposit: req.body.deposit, newBalance: newBalance});
}