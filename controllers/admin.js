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
    const { title, imageUrl, description, price } = req.body;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/products");
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
