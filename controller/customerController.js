import db from "../models/index.js";

const Customer = db.Customer;

//POST
export const createCustomer = async (req, res) => {
    let customer = await Customer.create(req.body);
    res.JSON(customer);
}

//GET
export const getCustomers = async (req, res) => {
    let customers = await Customer.findAll({});
    res.JSON(customers);
}

//GET
export const getOneCustomer = async(req, res) => {
    let customer = await Customer.findOne({
        where: username === req.body.username
    })
    res.JSON(customer);
}

//PATCH
export const updateCustomer = async (req, res) => {
    let customer = await Customer.update(req.body, {
        where: username === req.body.username
    })
}