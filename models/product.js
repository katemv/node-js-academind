const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
const collections = require("../util/database").collections;

class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const db = getDb();
        return db.collection(collections.PRODUCTS)
            .insertOne(this)
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection(collections.PRODUCTS)
            .find()
            .toArray()
            .then((products) => products)
            .catch((err) => console.log(err));
    }

    static findById(productId) {
        const db = getDb();
        return db.collection(collections.PRODUCTS)
            .find({ _id: new mongodb.ObjectId(productId) })
            .next()
            .then((product) => product)
            .catch((err) => console.log(err));
    }
}

module.exports = Product;
