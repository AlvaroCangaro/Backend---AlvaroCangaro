const express = require("express");
const app = express();
const productosRoute = require("./routes/productos");
const indexRoute = require("./routes/index");
const path = require("path");
const morgan = require("morgan");

// settings
app.set("port", 8080);
app.set("json spaces", 2);
// app.set("views", path.join(__dirname, "views"));// ejs
// app.set("view engine", "ejs");// ejs
app.set("views", path.join(__dirname, "./views")); // pug
app.set("view engine", "pug");// pug

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/", indexRoute);
app.use("/api/productos", productosRoute);

// statics
app.use(express.static(path.join(__dirname, "public")));
// app.use('/html', express.static('html'))

// 404 handler
app.use((req, res, next) => {
    res.send("404 not found");
});

module.exports = app;