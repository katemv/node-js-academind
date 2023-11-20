const Product = require("../models/product");
const { validationResult } = require("express-validator");

exports.getAddProduct = (req, res) => {
    res.render(
        "admin/edit-product",
        {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            editing: false,
            hasError: false,
            errorMessage: null
        }
    );
};

exports.postAddProduct = (req, res, next) => {
    const { title, imageUrl, description, price } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render(
            "admin/edit-product",
            {
                pageTitle: "Add Product",
                path: "/admin/edit-product",
                editing: false,
                hasError: true,
                errorMessage: errors.array()[0].msg,
                product: {
                    title,
                    imageUrl,
                    description,
                    price
                }
            }
        );
    }

    const product = new Product({
        title,
        imageUrl,
        description,
        price,
        userId: req.user._id
    });

    product.save()
        .then(() => res.redirect("/products"))
        .catch((err) => {
            const error = new Error(err);
            error.httpStatus = 500;

            return next(error);
        });
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
                    hasError: false,
                    errorMessage: null,
                    product
                }
            );
        })
        .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
    const { productId, title, imageUrl, description, price } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render(
            "admin/edit-product",
            {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: true,
                hasError: true,
                errorMessage: errors.array()[0].msg,
                product: {
                    title,
                    imageUrl,
                    description,
                    price,
                    _id: productId
                }
            }
        );
    }

    Product.findById(productId)
        .then((product) => {
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect("/");
            }

            product.title = title;
            product.imageUrl = imageUrl;
            product.description = description;
            product.price = price;

            return product
                .save()
                .then(() => res.redirect("/admin/products"));
        })
        .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
    const { productId } = req.body;

    Product.deleteOne({ _id: productId, userId: req.user._id })
        .then(() => res.redirect("/admin/products"))
        .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
    Product.find({ userId: req.user._id })
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
