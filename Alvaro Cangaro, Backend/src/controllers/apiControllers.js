const Contenedor = require("../class/container");
const data = new Contenedor();

const formView = (req, res) => {
    res.render("form");
};

const productsView = (req, res) => {
    let products = data.getAll();
    res.render("products", { products });
};

const formSubmit = (req, res) => {
    data.save(req.body);
    res.redirect("/");
};

module.exports = { formView, productsView, formSubmit };