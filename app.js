const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./util/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
    // User.findByPk(1)
    //     .then((user) => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch((err) => console.log("err", err));
// });

app.set("view engine", "pug");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
});


