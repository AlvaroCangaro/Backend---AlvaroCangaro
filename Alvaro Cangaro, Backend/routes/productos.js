const { Router } = require("express");
const { send } = require("express/lib/response");
const router = Router();
const products = require("../products.json");

router.get("/", (req, res) => {
    res.json(products);
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    let data = products.find(item => item.id == id)
    if (!data) {
        res.json({ "error": "producto no encontrado" })
    }
    res.json(data);
});


router.post('/', async (req, res) => {
    const { title, price, thumbnail } = req.body;
    if (title && price && thumbnail) {
        try {
            const id = products.length + 1;
            const newProduct = { ...req.body, id };
            products.push(newProduct);
            res.json("Guardado");
            return products.id;
        } catch (err) {
            console.log(`No se puede guardar el objeto ${err}`)
        }
    } else {
        res.send('Complete los datos restantes');
    }
    res.status(500).send('Producto cargado exitosamente');
});

router.put("/:id", (req, res) => {
    let { id } = req.params;
    const updateP = products.find(item => item.id == id);
    console.log(updateP)
    const { title, price, thumbnail } = req.body
    if (title && price && thumbnail) {
        try {
            updateP = { ...req.body };
            products.push(updateP);
            res.json("Guardado");
            return products.id;
        } catch (err) {
            console.log(`No se pudo actualizar el producto ${err}`);
        }
    }
    res.status(500).send('Producto actualizado correctamente');
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    let data = products.filter(item => item.id != id);
    if (!data) {
        res.json({ error: "Producto no encontrado" })
    }
    res.json(data).send("Producto eliminado");
});

module.exports = router;