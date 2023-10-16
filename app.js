const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const rootDir = require("./util/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");
const errorController = require("./controllers/error");
const { collections } = require("./util/old/database-mongodb");

const MONGODB_URI = "mongodb+srv://mvkatt:rZFoWqYyFxJTpPjs@cluster0.cliwa5l.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({ uri: MONGODB_URI, collection: collections.SESSIONS })
}));

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }

    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => console.log("err", err));
});

app.set("view engine", "pug");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));


