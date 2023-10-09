const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const rootDir = require("./util/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// const User = require("./models/user");
const errorController = require("./controllers/error");

const testUserId = "6521d72f0f93df2e403f2fe2";

const app = express();

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// app.use((req, res, next) => {
//     User.findById(testUserId)
//         .then((user) => {
//             req.user = new User(user.name, user.email, user.cart, user._id);
//             next();
//         })
//         .catch((err) => console.log("err", err));
// });

app.set("view engine", "pug");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect("mongodb+srv://mvkatt:rZFoWqYyFxJTpPjs@cluster0.cliwa5l.mongodb.net/shop?retryWrites=true&w=majority")
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));


