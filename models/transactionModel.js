export const transactionModel = (Sequelize, DataTypes) => {
    const Transaction = Sequelize.define('Transactions', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pricePerUnit: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        overallPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        timeStamp: {
            type: DataTypes.DATE,
            default: Date.now()
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