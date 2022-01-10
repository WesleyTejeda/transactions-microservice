import { customerController, walletController, transactionController } from "../controller/index.js";
import express from "express";

const router = express.Router();

router.get("/customers", (req, res)=> {
    let customers = customerController.getCustomers(req, res);
})

router.get("/wallets", (req, res)=> {
    let wallets = customerController.getWallets(req, res);
})

router.get("/transactions", (req, res)=> {
    let transactions = customerController.getTransactions(req, res);
})

router.post("/create/customer", (req, res) => {
    customerController.createCustomer(req, res);
})

router.post("/create/transaction", (req, res) => {
    transactionController.createTransaction(req, res);
})

router.post("/create/wallet", (req, res) => {
    walletController.createWallet(req, res);
})

export default router