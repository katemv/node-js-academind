const fs = require("fs");
const path = require("path");
const dirname = require("../util/path");

const p = path.join(dirname, "data", "cart.json");

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart state
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }

            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex((product) => product.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;

            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }

            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find((product) => product.id === id);

            if (!product) {
                return;
            }

            updatedCart.products = updatedCart.products.filter((product) => product.id !== id);
            updatedCart.totalPrice = productPrice - productPrice * product.qty;

            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {

            if (err) {
                cb(null);
            } else {
                cb(JSON.parse(fileContent));
            }

        });
    }
}
