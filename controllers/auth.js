const User = require("../models/user");

const testUserId = "65238bb5bbdf68d27fd92edb";

exports.getLogin = (req, res) => {
    console.log(req.session);
    res.render(
        "auth/login",
        {
            pageTitle: "Login",
            path: "/login",
            isAuthenticated: req.session.isLoggedIn
        }
    );
}

exports.postLogin = (req, res) => {
    User.findById(testUserId)
        .then((user) => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect("/");
        })
        .catch((err) => console.log("err", err));
}
