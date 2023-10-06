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
}

module.exports = Product;
