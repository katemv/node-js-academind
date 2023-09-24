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

    Product.create({ title, imageUrl, description, price }, {})
        .then(() => res.redirect("/products"))
        .catch((err) => console.log(err));
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

exports.postEditProduct = (req, res) => {
    const { productId, title, imageUrl, description, price } = req.body;

    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect("/");
        }

        const updatedProduct = new Product(productId, title, imageUrl, description, price);
        updatedProduct.save();
        res.redirect("/admin/products");
    });

};

exports.postDeleteProduct = (req, res) => {
    const { productId } = req.body;

    Product.deleteById(productId, () => {
        res.redirect("/admin/products");
    });
};

exports.getProducts = (req, res) => {
    Product.findAll().then((products) => {
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
