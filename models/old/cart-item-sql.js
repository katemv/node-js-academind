const { DataTypes } = require("sequelize");
const sequelize = require("../../util/old/database-mongodb");

const CartItem = sequelize.define("cartItem", {
    id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
});

module.exports = CartItem;