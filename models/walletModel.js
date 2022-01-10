export const walletModel = (Sequelize, DataTypes) => {
    const Wallet = Sequelize.define('Wallets', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        currencyType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currencyAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    Wallet.associate = (db) => {
        Wallet.belongsTo(db.Customer, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Wallet;
}