import db from "../models/index.js";

const Customer = db.Customer;


//GET
export const getCustomers = async (req, res) => {
    let customers = await Customer.findAll({
        include: [db.Wallet, db.Transaction]
    }).then(data => data).catch(err => err);
    res.json(customers);
}

//GET
export const getOneCustomer = async(req, res) => {
    let customer = await Customer.findOne({
        where: {id: req.params.id},
        include: [db.Wallet, db.Transaction],
    }).then(data => data).catch(err => err);
    // req.session.id = customer.id;
    res.json(customer);
}

//POST
export const createCustomer = async (req, res) => {
    let exists = await Customer.findOne({
        where: {
            id: req.body.id
        }
    }).then(data => data).catch(err => err);
    if(exists){
        res.json({error: "Customer already exists."})
    } else {
        let customer = await Customer.create(req.body);
        await db.Wallet.create({currencyType: "USD", currencyAmount: 0, CustomerId: customer.id})
        res.json(customer);
    }
}

// //PATCH
// export const updateCustomer = async (req, res) => {
//     await Customer.update(req.body, {
//         where: {id: req.body.id}
//     })
//     let customer = await Customer.findOne({
//         where: {
//             id: req.body.id
//         },
//         include: [db.Wallet, db.Transaction]
//     })
//     res.json({message: "Customer Updated", customerInfo: customer})
// }