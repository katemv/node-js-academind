const { DataTypes } = require("sequelize");
const sequelize = require("../util/database");

const OrderSql = sequelize.define("order", {
   id:  {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
});

module.exports = OrderSql;
