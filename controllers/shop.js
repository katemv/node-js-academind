const Product = require("../models/product");
const Cart = require("../models/cart");

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

exports.getProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        res.render(
            "shop/product-detail",
            {
                product,
                pageTitle: product.title,
                path: "/products"
            }
        );
    })
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

exports.postCart = (req) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    });
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
