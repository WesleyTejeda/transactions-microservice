export const customerModel = (Sequelize, DataTypes) => {
    const Customer = Sequelize.define('Customers', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    })

    Customer.associate = (db) => {
        Customer.hasMany(db.Transaction);
        Customer.hasOne(db.Wallet)
    }

    return Customer
}