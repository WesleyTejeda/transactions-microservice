import db from "../models/index.js";

const Transaction = db.Transaction;

//POST
export const createTransaction = async (req, res) => {
    req.body.overallPrice = parseInt(req.body.quantity) * parseInt(req.body.pricePerUnit)
    let transaction = await Transaction.create(req.body);
    res.JSON(transaction);
}

//GET
export const getTransactions = async (req, res) => {
    let transactions = await Transaction.findAll({});
    return transactions;
}