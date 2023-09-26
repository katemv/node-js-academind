const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const rootDir = require("./util/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.use(express.static(path.join(rootDir, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    User.findByPk(1)
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

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
    .sync()
    // .sync({ force: true })
    .then(() => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({ name: "Kate", email: "test@test.com" })
        }

        return user;
    })
    .then((user) => {
        return user.createCart();
    })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log("err", err);
    });

