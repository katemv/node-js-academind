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

    const product = new Product({ title, imageUrl, description, price });

    product.save()
        .then(() => res.redirect("/products"))
        .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    const productId = req.params.productId;

    if (!editMode) {
        return res.redirect("/");
    }

    Product.findById(productId)
        .then((product) => {
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
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
    const { productId, title, imageUrl, description, price } = req.body;

    Product.findById(productId)
        .then((product) => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;

            return product.save();
        })
        .then(() => res.redirect("/admin/products"))
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
    const { productId } = req.body;

    Product.findByIdAndRemove(productId)
        .then(() => res.redirect("/admin/products"))
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
    Product.find()
        .then((products) => {
        res.render(
            "admin/products",
            {
                products,
                pageTitle: "Products",
                path: "/admin/products"
            }
        );
    })
        .catch((err) => console.log(err));
};
