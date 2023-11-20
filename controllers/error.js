exports.get404 = (req, res) => {
    res.status(404)
        .render("404", { pageTitle: "404 | Page not found" })
};

exports.get500 = (req, res) => {
    res.status(500)
        .render("500", { pageTitle: "500 | Something went wrong" })
};
