const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

// /login => GET
router.get("/login", authController.getLogin);

// /login => POST
router.post("/login", authController.postLogin);

module.exports = router;
