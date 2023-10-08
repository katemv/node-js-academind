const { DataTypes } = require("sequelize");

const sequelize = require("../../util/old/database-mongodb");

const UserSql = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = UserSql;
