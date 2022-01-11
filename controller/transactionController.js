import db from "../models/index.js";

const Transaction = db.Transaction;

//GET
export const getTransactions = async (req, res) => {
    let transactions = await Transaction.findAll({});
    res.json(transactions);
}

//GET
export const getUserTransaction = async (req, res) => {
    let transaction = await Transaction.findAll({
        where: {CustomerId: req.params.id}
    })
    res.json(transaction);
}

//POST
export const createTransaction = async (req, res) => {
    if(req.body.type === 'deposit'){
        let transaction = await Transaction.create(req.body);
        return transaction
    } else if(req.body.type === 'purchase'){
        req.body.amount = (req.body.quantity * req.body.pricePerUnit).toFixed(2);
        let transaction = await Transaction.create(req.body);
        return transaction;
    } else {
        res.json({error: "Charge type not provided"})
    }
}
