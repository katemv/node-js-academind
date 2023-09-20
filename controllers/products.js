const Product = require("../models/product");

exports.getAddProducts = (req, res) => {
    res.render(
        "add-product",
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
            "shop",
            {
                products,
                pageTitle: "Shop",
                path: "/"
            }
        );
    });
}
