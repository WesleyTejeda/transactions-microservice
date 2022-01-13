export const customerModel = (Sequelize, DataTypes) => {
    const Customer = Sequelize.define('Customers', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    Customer.associate = (db) => {
        Customer.hasMany(db.Transaction);
        Customer.hasOne(db.Wallet)
    }

    return Customer
}