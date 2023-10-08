const mongodb = require("mongodb");
const { getDb, collections} = require("../util/old/database-mongodb");

class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save() {
        const db = getDb();

        return db.collection(collections.USERS).insertOne(this);
    }

    addToCart(product) {
        const db = getDb();
        const cartProductIndex = this.cart.items.findIndex((item) => {
            return item.productId.toString() === product._id.toString();
        });

        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity + 1;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: 1
            });
        }

        return db.collection(collections.USERS)
            .updateOne(
                { _id: this._id },
                {
                    $set: {
                        cart: {
                            items: updatedCartItems
                        }
                    }
                }
            );
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map((item) => item.productId);

        return db.collection(collections.PRODUCTS)
            .find({ _id: { $in: productIds } })
            .toArray()
            .then((products) => {
                return products.map((product) => {
                    return {
                        ...product,
                        quantity: this.cart.items.find((item) => {
                            return item.productId.toString() === product._id.toString();
                        }).quantity
                    }
                })
            })
            .catch((err) => console.log(err));
    }

    deleteItemFromCart(productId) {
        const db = getDb();
        const updatedCartItems = this.cart.items.filter((item) => item.productId.toString() !== productId.toString());

        return db.collection(collections.USERS)
            .updateOne(
                { _id: this._id },
                { $set: { cart: { items: updatedCartItems } } }
            );
    }

    addOrder() {
        const db = getDb();

        return this.getCart()
            .then((products) => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb.ObjectId(this._id),
                        username: this.username,
                        email: this.email
                    }
                }

                return db.collection(collections.ORDERS).insertOne(order);
            })
            .then(() => {
                this.cart = { items: [] };

                return db.collection(collections.USERS)
                    .updateOne(
                        { _id: new mongodb.ObjectId(this._id)},
                        { $set: { cart: { items: [] } } }
                    )
            });
    }

    getOrders() {
        const db = getDb();

        return db.collection(collections.ORDERS)
            .find({ "user._id": new mongodb.ObjectId(this._id) })
            .toArray();
    }

    static findById(userId) {
        const db = getDb();
        return db.collection(collections.USERS)
            .find({ _id: new mongodb.ObjectId(userId) })
            .next()
            .then((user) => user)
            .catch((err) => console.log(err));
    }
}

module.exports = User;