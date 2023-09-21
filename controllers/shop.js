const Product = require("../models/product");

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render(
            "shop/product-list",
            {
                products,
                pageTitle: "Shop",
                path: "/products"
            }
        );
    });
}

exports.getIndex = (req, res) => {
    Product.fetchAll((products) => {
        res.render(
            "shop/index",
            {
                products,
                pageTitle: "Shop",
                path: "/"
            }
        );
    });
}

exports.getCart = (req, res) => {
    res.render(
        "shop/cart",
        {
            pageTitle: "Cart",
            path: "/cart"
        }
    );
}

exports.getOrders = (req, res) => {
    res.render(
        "shop/orders",
        {
            pageTitle: "Orders",
            path: "/orders"
        }
    );
}

exports.getCheckout = (req, res) => {
    res.render(
        "shop/checkout",
        {
            pageTitle: "Checkout",
            path: "/checkout"
        }
    );
}
