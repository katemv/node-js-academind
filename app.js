const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const rootDir = require("./util/path");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res) => {
   res.status(404)
       // .sendFile(path.join(rootDir, "views", "404.html"));
       .render("404", { docTitle: "404 | Page not found" })
});

app.listen(3000);
