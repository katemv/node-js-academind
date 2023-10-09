const Product = require("../models/product");

exports.getProducts = (req, res) => {
    Product.find()
        .then((products) => {
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

    Product.findById(productId)
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
    Product.find()
        .then((products) => {
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
            res.render(
                "shop/cart",
                {
                    pageTitle: "Cart",
                    path: "/cart",
                    products: cart
                }
            );
        })
        .catch((err) => console.log(err));
}

exports.postCart = (req, res) => {
    const productId = req.body.productId;

    Product.findById(productId)
        .then((product) => req.user.addToCart(product))
        .then(() => res.redirect("/cart"))
        .catch((err) => console.log(err));
}

exports.postCartDeleteProduct = (req, res) => {
    const productId = req.body.productId;

    req.user.deleteItemFromCart(productId)
        .then(() => res.redirect("/cart"))
        .catch((err) => console.log(err));
}

exports.getOrders = (req, res) => {
    req.user.getOrders()
        .then((orders) => {
            res.render(
                "shop/orders",
                {
                    pageTitle: "Orders",
                    path: "/orders",
                    orders
                }
            );
        })
        .catch((err) => console.log(err));


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

exports.postOrder = (req, res) => {
    req.user.addOrder()
        .then(() => res.redirect("/orders"))
        .catch((err) => console.log(err));
}
