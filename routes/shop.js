const express = require("express");

const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res) => {
    // res.sendFile(path.join(rootDir, "views", "shop.html"));
    res.render("shop", { products: adminData.products, docTitle: "Shop" });
});

module.exports = router;
