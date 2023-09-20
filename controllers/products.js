const products = [];

exports.getAddProducts = (req, res) => {
    res.render(
        "add-product",
        {
            pageTitle: "Add Product",
            path: "/admin/add-product"
        }
    );
};

exports.postAddProduct = (req, res) => {
    products.push({ title : req.body.title });
    res.redirect("/");
};

exports.getProducts = (req, res) => {
    res.render(
        "shop",
        {
            products,
            pageTitle: "Shop",
            path: "/"
        }
    );
}
