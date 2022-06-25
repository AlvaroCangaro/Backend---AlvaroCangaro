const Contenedor = require("../class/container");
const file = new Contenedor();

const getAll = (req, res) => {
    let data = file.getAll();
    res.json(data);
};

const getProductById = (req, res) => {
    let data = file.getById(req.params.id);
    if (!data) {
        res.json({ error: "producto no encontrado" });
    }
    res.json(data);
};

const postProduct = (req, res) => {
    let data = file.save(req.body);
    res.json(data);
};

const putProduct = (req, res) => {
    let data = file.update(req.body, req.params.id);
    res.json(data);
};

const deleteProduct = (req, res) => {
    let data = file.deleteById(req.params.id);
    if (!data) {
        res.json({ error: "producto no encontrado" });
    }
    res.json(data);
};

module.exports = {
    getAll,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct,
};