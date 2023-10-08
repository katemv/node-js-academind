const mongodb = require("mongodb");
const getDb = require("../util/old/database-mongodb").getDb;
const collections = require("../util/old/database-mongodb").collections;

class Product {
    constructor(title, imageUrl, description, price, id, userId) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();
        let dbOperation;

        if (this._id) {
            dbOperation = db.collection(collections.PRODUCTS)
                .updateOne(
                    { _id: this._id },
                    { $set: this }
                );
        } else {
            dbOperation = db.collection(collections.PRODUCTS).insertOne(this);
        }

        return dbOperation
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

    static deleteById (productId) {
        const db = getDb();
        return db.collection(collections.PRODUCTS)
            .deleteOne({ _id: new mongodb.ObjectId(productId) })
            .catch((err) => console.log(err));
    }
}

module.exports = Product;
