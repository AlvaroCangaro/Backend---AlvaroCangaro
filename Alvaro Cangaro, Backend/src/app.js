const express = require("express");
const app = express();
const indexApiRest = require("./routes/indexApiRest");
const indexApi = require("./routes/indexApi");
const path = require("path");
const morgan = require("morgan");
const { engine } = require("express-handlebars");

// handlebars settings
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: path.join(__dirname, "./views/layout/main.hbs"),
        layoutsDir: path.join(__dirname, "./views/layout"),
        partialsDir: path.join(__dirname, "./views/partials"),
    })
);


// settings
app.set("port", 8080);
app.set("json spaces", 2);
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");// ejs
// app.set("view engine", "pug");// pug
app.set("view engine", "hbs"); // hbs


// middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/", indexApi);
app.use("/api/productos", indexApiRest);

// staticsnp
app.use(express.static(path.join(__dirname, "./public")));

// 404 handler
app.use((req, res, next) => {
    res.send("404 not found");
});

module.exports = app;