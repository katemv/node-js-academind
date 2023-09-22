const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render(
        "admin/edit-product",
        {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false
        }
    );
};

exports.postAddProduct = (req, res) => {
    const { title, imageUrl, description, price } = req.body;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/products");
};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;

    if (!editMode) {
        return res.redirect("/");
    }

    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect("/");
        }

        res.render(
            "admin/edit-product",
            {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product,
            }
        );
    });


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
