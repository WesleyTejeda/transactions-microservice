import { createCustomer, getCustomers, getOneCustomer, updateCustomer } from "./customerController.js";
import { createTransaction, getTransactions } from "./transactionController.js";
import { chargeOneWallet, createWallet, getUserWallet, getWallets } from "./walletController.js";

export const customerController = {
    getCustomers: getCustomers,
    getOneCustomer: getOneCustomer,
    createCustomer: createCustomer,
    updateCustomer: updateCustomer
}

export const walletController = {
    getWallets: getWallets,
    getUserWallet: getUserWallet,
    createWallet: createWallet,
    chargeWallet: chargeOneWallet
}

export const transactionController = {
    getTransactions: getTransactions,
    createTransaction: createTransaction
}