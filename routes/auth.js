const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

// /login => GET
router.get("/login", authController.getLogin);

// /login => POST
router.post("/login", authController.postLogin);

// /logout => POST
router.post("/logout", authController.postLogout);

// /signup => GET
router.get("/signup", authController.getSignup);

// /signup => POST
router.post(
    "/signup",
    [
        check("email")
            .isEmail()
            .withMessage("Please enter a valid email.")
            .normalizeEmail()
            .custom((value) => {
                return User.findOne({ email: value })
                    .then((userDoc) => {
                        if (userDoc) {
                            return Promise.reject("E-Mail already exists.")
                        }
                    })
            }),
        body("password", "Please enter a password with at least 5 characters.")
            .isLength({ min: 5 })
            .trim(),
        body("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords have to match.");
                }

                return true;
            })
            .trim(),
    ],
    authController.postSignup
);

// /reset => GET
router.get("/reset", authController.getReset);

// /reset => POST
router.post("/reset", authController.postReset);

// /new-password => GET
router.get("/reset/:token", authController.getNewPassword);

// /new-password => POST
router.post("/new-password", authController.postNewPassword);

module.exports = router;
