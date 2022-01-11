export const transactionModel = (Sequelize, DataTypes) => {
    const Transaction = Sequelize.define('Transactions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        type: {
            type: DataTypes.STRING
        },
        quantity: {
            type: DataTypes.FLOAT
        },
        pricePerUnit: {
            type: DataTypes.FLOAT
        },
        amount: {
            type: DataTypes.FLOAT,
        }
    })

    Transaction.associate = (db) => {
        Transaction.belongsTo(db.Customer, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Transaction;
}