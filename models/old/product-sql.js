const sequelize = require("../../util/old/database-sql");
const { DataTypes} = require("sequelize");

const Product = sequelize.define("product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.STRING,
});

module.exports = Product;
