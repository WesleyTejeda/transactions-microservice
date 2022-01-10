import db from "../models/index.js";

const Wallet = db.Wallet;

//POST
export const createWallet = async (req, res) => {
    let wallet = await Wallet.create(req.body);
    res.JSON(wallet);
}

//GET
export const getWallets = async (req, res) => {
    let wallets = await Wallet.findAll({});
    res.JSON(wallets);
}

//GET
export const getUserWallet = async (req, res) => {
    let wallet = await Wallet.findOne({
        where: CustomerId === req.body.CustomerId
    });
    res.JSON(wallet);
}

//PATCH
export const chargeOneWallet = async(req, res) => {
    //incoming charge body = {CustomerId, incomingCharge}
    let wallet = await Wallet.findOne({where: CustomerId === req.body.CustomerId});
    let newBalance =  parseInt(wallet.currencyAmount) - req.body.incomingCharge;
    await Wallet.update({currencyAmount: newBalance}, {
        where: CustomerId === wallet.CustomerId
    })
    res.JSON({incomingCharge: req.body.incomingCharge, newBalance: newBalance});
}