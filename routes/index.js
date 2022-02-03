import { customerController, walletController, transactionController } from "../controller/index.js";
import express from "express";

const router = express.Router();

const secretCheck = (req, res, next) => {
    req.params.key === "pmY6WrA2oO7Vfdd4zpfz97C9aWMLELqv" ? next() : res.json({error: "Access denied to gateway."})
}

router.get("/customers/:key", secretCheck(req, res, next), (req, res)=> {
    customerController.getCustomers(req, res);
})

router.get("/customers/:id/:key", secretCheck(req, res, next), (req, res) => {
    customerController.getOneCustomer(req, res);
})

router.post("/customers/create/:key", secretCheck(req, res, next), (req, res) => {
    customerController.createCustomer(req, res);
})

router.get("/transactions/:key", secretCheck(req, res, next), (req, res)=> {
    transactionController.getTransactions(req, res);
})

router.get("/transactions/:id/:key", secretCheck(req, res, next), (req, res) => {
    transactionController.getUserTransaction(req, res);
})

router.post("/transactions/create/:key", secretCheck(req, res, next), (req, res) => {
    transactionController.createTransaction(req, res).then( async transaction => {
        if(transaction){
            if(transaction.dataValues.type === "deposit") {
                let wallet = await walletController.depositWallet(req, res, transaction);
                res.json({transaction: transaction, wallet: wallet});
            } else if(transaction.dataValues.type === "purchase") {
                let wallet = await walletController.chargeWallet(req, res, transaction);
                res.json({transaction: transaction, wallet: wallet});
            }
        }
    })
})

router.post("/transactions/sell/:key", secretCheck(req, res, next), (req, res) => {
    transactionController.sellFund(req, res).then( async transaction => {
        if(transaction){
            console.log(transaction, "sell -----")
            let wallet = await walletController.depositWallet(req, res, transaction);
            res.json({transaction: transaction, wallet: wallet})
        }
    })
})


export default router