const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res) => {
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
    const { email, password } = req.body;
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.redirect("/login");
            }

            bcrypt
                .compare(password, user.password)
                .then((doMatch) => {
                    if (doMatch) {
                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        return req.session.save((err) => {
                            console.log(err);
                            res.redirect("/");
                        });
                    }

                    res.redirect("/login");
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect("/login");
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

exports.getSignup = (req, res) => {
    res.render(
        "auth/signup",
        {
            pageTitle: "Signup",
            path: "/signup",
            isAuthenticated: req.session.isLoggedIn
        }
    );
};

exports.postSignup = (req, res) => {
    const { email, password, confirmPassword } = req.body;

    User.findOne({ email })
        .then((userDoc) => {
            if (userDoc) {
                return res.redirect("/signup");
            }

            return bcrypt.hash(password, 12)
                .then((hashedPassword) => {
                    const user = new User({
                        email,
                        password: hashedPassword,
                        cart: { items: [] }
                    });

                    return user.save();
                })
                .then(() => res.redirect("/login"))
        })
        .catch((err) => console.log(err));
};
