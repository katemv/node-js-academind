const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");
const { sendgridApiKey } = require("../util/config");

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: sendgridApiKey,
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
                        });
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

exports.postReset = (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            return res.redirect("/reset");
        }

        const token = buffer.toString("hex");
        User.findOne({ email: req.body.email })
            .then((user) => {
                if (!user) {
                    req.flash("error", "No account with that email found.");
                    return res.redirect("/reset");
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;

                return user.save();
            })
            .then(() => {
                res.redirect("/");
                return transporter
                    .sendMail({
                        to: req.body.email,
                        from: "mvkatt@gmail.com",
                        subject: "Password reset",
                        html: `
                            <p>You requested password reset</p>
                            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                        `
                    });
            })
            .catch((err) => console.log(err));
    })
};

exports.getNewPassword = (req, res) => {
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
        .then((user) => {
            res.render(
                "auth/new-password",
                {
                    pageTitle: "New password",
                    path: "/new-password",
                    passwordToken: token,
                    userId: user._id.toString(),
                    errorMessage: message.length > 0 ? message[0] : null,
                }
            );
        })
        .catch((err) => console.log(err));

    const message = req.flash("error");
};

exports.postNewPassword = (req, res) => {
    const { newPassword, userId, passwordToken } = req.body;
    let resetUser;

    User.findOne({
        resetToken: passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
        _id: userId
    })
        .then((user) => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12);
        })
        .then((hashedPassword) => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = null;
            resetUser.resetTokenExpiration = undefined;

            return resetUser.save();
        })
        .then(() => res.redirect("/login"))
        .catch((err) => console.log(err));
}
