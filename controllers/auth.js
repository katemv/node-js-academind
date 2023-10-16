exports.getLogin = (req, res) => {
    res.render(
        "auth/login",
        {
            pageTitle: "Login",
            path: "/login",
            isAuthenticated: req.get("Cookie").split("=")[1]
        }
    );
}

exports.postLogin = (req, res) => {
    res.setHeader("Set-Cookie", "loggedIn=true");
    res.redirect("/");
}
