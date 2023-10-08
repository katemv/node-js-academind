const Product = require("../models/product");

exports.getProducts = (req, res) => {
    Product.fetchAll().then((products) => {
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
    Product.fetchAll().then((products) => {
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

    // req.user.getCart()
    //     .then((cart) => {
    //         return cart.getProducts({ where : { id: productId } });
    //     })
    //     .then((products) => {
    //         const product = products[0];
    //
    //         product.cartItem.destroy();
    //     })
    //     .then(() => {
    //         res.redirect("/cart");
    //     })
    //     .catch((err) => console.log(err));
}

// exports.getOrders = (req, res) => {
//     req.user.getOrders({ include: ["products"]})
//         .then((orders) => {
//             res.render(
//                 "shop/orders",
//                 {
//                     pageTitle: "Orders",
//                     path: "/orders",
//                     orders
//                 }
//             );
//         })
//         .catch((err) => console.log(err));
//
//
// }
//
// exports.getCheckout = (req, res) => {
//     res.render(
//         "shop/checkout",
//         {
//             pageTitle: "Checkout",
//             path: "/checkout"
//         }
//     );
// }
//
// exports.postOrder = (req, res) => {
//     let fetchedCart;
//
//     req.user.getCart()
//         .then((cart) => {
//             fetchedCart = cart;
//             return fetchedCart.getProducts();
//         })
//         .then((products) => {
//             return req.user.createOrder()
//                 .then((order) => {
//                     return order.addProducts(products.map((product) => {
//                         product.orderItem = { quantity: product.cartItem.quantity };
//                         return product;
//                     }))
//                 })
//                 .catch((err) => console.log(err));
//         })
//         .then(() => {
//             fetchedCart.setProducts(null);
//         })
//         .then(() => {
//             res.redirect("/orders");
//         })
//         .catch((err) => console.log(err));
// }
