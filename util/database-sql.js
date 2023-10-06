const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    "node-complete",
    "root",
    "rootpass",
    {
        dialect: "mysql",
        host: "localhost"
    }
);

module.exports = sequelize;