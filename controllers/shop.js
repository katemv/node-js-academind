const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res) => {
    Product.findAll().then((products) => {
            res.render(
                "shop/product-list",
                {
                    products,
                    pageTitle: "Shop",
                    path: "/products"
                }
            );
        })
        .catch((err) => console.log(err));
}

exports.getProduct = (req, res) => {
    const productId = req.params.productId;

    Product.findByPk(productId)
        .then((product) => {
            res.render(
                "shop/product-detail",
                {
                    product: product,
                    pageTitle: product.title,
                    path: "/products"
                }
            );
        })
        .catch((err) => console.log(err));
}

exports.getIndex = (req, res) => {
    Product.findAll().then((products) => {
            res.render(
                "shop/index",
                {
                    products,
                    pageTitle: "Shop",
                    path: "/"
                }
            );
        })
        .catch((err) => console.log(err));
}

exports.getCart = (req, res) => {
    req.user.getCart()
        .then((cart) => {
            return cart.getProducts()
                .then((products) => {
                    res.render(
                        "shop/cart",
                        {
                            pageTitle: "Cart",
                            path: "/cart",
                            products
                        }
                    );
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
}

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);

        res.redirect("/cart");
    });
}

exports.postCartDeleteProduct = (req, res) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.deleteProduct(productId, product.price);

        res.redirect("/cart");
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
