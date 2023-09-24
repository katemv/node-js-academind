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

    Product.findById(productId)
        .then(([products]) => {
            res.render(
                "shop/product-detail",
                {
                    product: products[0],
                    pageTitle: products[0].title,
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
    Cart.getCart((cart) => {
        Product.fetchAll((products) => {
            const cartProducts = [];

            for (product of products) {
                const cartProductData = cart.products.find((cartProduct) => product.id === cartProduct.id);

                if (cartProductData) {
                    cartProducts.push({ productData: product, qty: cartProductData.qty});
                }
            }
            res.render(
                "shop/cart",
                {
                    pageTitle: "Cart",
                    path: "/cart",
                    products: cartProducts
                }
            );
        });
    });
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
