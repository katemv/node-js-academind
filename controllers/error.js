exports.get404 = (req, res) => {
    res.status(404)
        .render("404", { pageTitle: "404 | Page not found" })
};
