const { DataTypes } = require("sequelize");
const sequelize = require("../../util/old/database-mongodb");

const Cart = sequelize.define("cart", {
    id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = Cart;