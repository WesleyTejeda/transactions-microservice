import { createCustomer, getCustomers, getOneCustomer, updateCustomer } from "./customerController.js";
import { createTransaction, getUserTransaction, getTransactions } from "./transactionController.js";
import { chargeOneWallet, createWallet, depositOneWallet, getUserWallet, getWallets } from "./walletController.js";

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
    chargeWallet: chargeOneWallet,
    depositWallet: depositOneWallet
}

export const transactionController = {
    getTransactions: getTransactions,
    getUserTransaction: getUserTransaction,
    createTransaction: createTransaction
}