const Product = require("../models/product");

exports.getAddProducts = (req, res) => {
    res.render(
        "admin/add-product",
        {
            pageTitle: "Add Product",
            path: "/admin/add-product"
        }
    );
};

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.render(
            "admin/products",
            {
                products,
                pageTitle: "Products",
                path: "/admin/products"
            }
        );
    });
};
