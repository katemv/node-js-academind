const Product = require("../../models/old/product-sql");

exports.getAddProduct = (req, res) => {
    console.log("getAddProduct");
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

    Product.findByPk(productId)
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

    Product.findByPk(productId)
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

    Product.findByPk(productId)
        .then((product) => product.destroy())
        .then(() => res.redirect("/admin/products"))
        .catch((err) => console.log(err));
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
