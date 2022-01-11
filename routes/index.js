import { customerController, walletController, transactionController } from "../controller/index.js";
import express from "express";

const router = express.Router();

router.get("/customers", (req, res)=> {
    customerController.getCustomers(req, res);
})

router.get("/customers/:id", (req, res) => {
    customerController.getOneCustomer(req, res);
})

router.post("/customers/create", (req, res) => {
    customerController.createCustomer(req, res);
})

router.patch("/customers/patch", (req, res) => {
    customerController.updateCustomer(req, res);
})

router.get("/wallets", (req, res)=> {
    walletController.getWallets(req, res);
})

router.get("/wallets/:id", (req, res) => {
    walletController.getUserWallet(req, res);
})


router.post("/wallets/create", (req, res) => {
    walletController.createWallet(req, res);
})

router.patch("/wallets/deposit", (req, res) => {
    walletController.depositWallet(req, res);
})

router.get("/transactions", (req, res)=> {
    transactionController.getTransactions(req, res);
})

router.get("/transactions/:id", (req, res) => {
    transactionController.getUserTransaction(req, res);
})

router.post("/transactions/create", (req, res) => {
    transactionController.createTransaction(req, res).then(transaction => {
        if(transaction.dataValues.type === "deposit") {
            let wallet = walletController.depositWallet(req, res, transaction);
            res.json({transaction: transaction, wallet: wallet});
        } else if(transaction.dataValues.type === "purchase") {
            let wallet = walletController.chargeWallet(req, res, transaction);
            res.json({transaction: transaction, wallet: wallet});
        }
    })
})


export default router