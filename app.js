const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const rootDir = require("./util/path");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// app.engine("hbs", expressHbs());
app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
   res.status(404)
       // .sendFile(path.join(rootDir, "views", "404.html"));
       .render("404", { pageTitle: "404 | Page not found" })
});

app.listen(3000);
