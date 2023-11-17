const express = require("express");
const { check } = require("express-validator");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

const productValidator = [
    check("title", "Please enter a valid title.")
        .isString()
        .isLength({ min: 3 })
        .trim(),
    check("imageUrl").isURL(),
    check("price", "Please enter a valid price.")
        .isFloat(),
    check("description", "Please enter a valid description.")
        .isLength({ min: 5, max: 400 })
        .trim(),
];

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/add-product => POST
router.post(
    "/add-product",
    productValidator,
    isAuth,
    adminController.postAddProduct
);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// /admin/edit-product/:productId => GET
router.get(
    "/edit-product/:productId",
    isAuth,
    adminController.getEditProduct
);

// /admin/edit-product => POST
router.post(
    "/edit-product",
    productValidator,
    isAuth,
    adminController.postEditProduct
);

// /admin/delete-product => POST
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
