const { DataTypes } = require("sequelize");
const sequelize = require("../../util/old/database-mongodb");

const OrderItemSql = sequelize.define("orderItem", {
    id:  {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: DataTypes.INTEGER
});

module.exports = OrderItemSql;
