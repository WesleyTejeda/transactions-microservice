import { Sequelize, DataTypes } from "sequelize";
import { customerModel } from "./customerModel.js";
import { transactionModel } from "./transactionModel.js";
import { walletModel } from "./walletModel.js";
import dotenv from "dotenv";
dotenv.config();


let sequelize = null;

    if (process && process.env.DATABASE_URL) {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
                }
              }
            }
        );
    } else {
        sequelize = new Sequelize ({
            database: process.env.DB,
            username: process.env.USER,
            password: process.env.PW,
            dialect: 'postgres',
            host: process.env.HOST
        });
    }

sequelize.authenticate().then(() => { // successfully connected to DB
    console.log("connected to Postgres DB")
})
.catch(e => {// failed connecting to DB
    console.log('unable to connect to Postgres DB ' + e)
})

const db = {};
db.sequelize = sequelize;

const Wallet = walletModel(sequelize, DataTypes);
const Transaction = transactionModel(sequelize, DataTypes);
const Customer = customerModel(sequelize, DataTypes);

db.Customer = Customer;
db.Transaction = Transaction;
db.Wallet = Wallet;

db.Customer.associate(db);
db.Transaction.associate(db);
db.Wallet.associate(db);

db.sequelize.sync({ force: false }).then(() => {
    console.log('DB synced with sequelize')
}).catch((error) => {
    console.log('Error syncing the DB to sequelize ' + error)
})

export default db