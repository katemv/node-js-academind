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
            req.session.save((err) => {
                console.log(err);
                res.redirect("/");
            });
        })
        .catch((err) => console.log("err", err));
}

exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect("/");
    });
};
