const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: "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",
    }
}));

exports.getLogin = (req, res) => {
    const message = req.flash("error");

    res.render(
        "auth/login",
        {
            pageTitle: "Login",
            path: "/login",
            errorMessage: message.length > 0 ? message[0] : null
        }
    );
}

exports.postLogin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                req.flash("error", "Invalid email or password.");
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

                    req.flash("error", "Invalid email or password.");
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
    const message = req.flash("error");

    res.render(
        "auth/signup",
        {
            pageTitle: "Signup",
            path: "/signup",
            errorMessage: message.length > 0 ? message[0] : null
        }
    );
};

exports.postSignup = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((userDoc) => {
            if (userDoc) {
                req.flash("error", "E-Mail already exists.");
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
                .then(() => {
                    res.redirect("/login");
                    return transporter
                        .sendMail({
                            to: email,
                            from: "mvkatt@gmail.com",
                            subject: "Signup succeeded!",
                            html: "<h1>You successfully signed up!</h1>"
                        })
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
};

exports.getReset = (req, res) => {
    const message = req.flash("error");

    res.render(
        "auth/reset",
        {
            pageTitle: "Reset password",
            path: "/reset",
            errorMessage: message.length > 0 ? message[0] : null
        }
    );
};
