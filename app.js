const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const errorController = require("./controller/errorController");
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoute);
app.use(shopRoutes);

app.use(errorController.notFoundPage);

app.listen(3000);
