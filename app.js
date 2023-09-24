const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./util/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "pug");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync().then((result) => {
        console.log("result", result);
        app.listen(3000);
    })
    .catch((err) => {
        console.log("err", err);
    });
