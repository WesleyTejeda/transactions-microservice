import db from "../models/index.js";

const Customer = db.Customer;


//GET
export const getCustomers = async (req, res) => {
    let customers = await Customer.findAll({
        include: [db.Wallet, db.Transaction]
    });
    res.json(customers);
}

//GET
export const getOneCustomer = async(req, res) => {
    let customer = await Customer.findOne({
        where: {id: req.params.id},
        include: [db.Wallet, db.Transaction]
    })
    res.json(customer);
}

//POST
export const createCustomer = async (req, res) => {
    let customer = await Customer.create(req.body);
    res.json(customer);
}

//PATCH
export const updateCustomer = async (req, res) => {
    let customer = await Customer.update(req.body, {
        where: {CustomerId: req.body.id}
    })
    res.json({message: "Customer Updated", customerInfo: customer})
}