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
        where: {username: req.params.username},
        include: [db.Wallet, db.Transaction],
    })
    res.json(customer);
}

//POST
export const createCustomer = async (req, res) => {
    let exists = await Customer.findOne({
        where: {
            username: req.body.username
        }
    });
    if(exists){
        res.json({error: "Customer already exists."})
    } else {
        let customer = await Customer.create(req.body);
        res.json(customer);
    }
}

//PATCH
export const updateCustomer = async (req, res) => {
    await Customer.update(req.body, {
        where: {id: req.body.id}
    })
    let customer = await Customer.findOne({
        where: {
            username: req.body.username
        },
        include: [db.Wallet, db.Transaction]
    })
    res.json({message: "Customer Updated", customerInfo: customer})
}