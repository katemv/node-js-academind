const { DataTypes } = require("sequelize");
const sequelize = require("../../util/old/database-mongodb");

const OrderSql = sequelize.define("order", {
   id:  {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
   },
});

module.exports = OrderSql;
