const { Router } = require("express");
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
            let ultimo = products.length - 1;
            let id = products[ultimo].id + 1;
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


router.put('/:id', (req, res) => {
    let resultado
    const id = products.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (id === -1) {
        resultado = { error: 'Producto no encontrado' }
    } else {
        products[id] = req.body;
        resultado = "Producto actualizado con exito"
    }
    res.json(resultado)
})


router.delete('/:id', (req, res) => {
    const id = products.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    let resultado = "";
    if (id === -1) {
        resultado = { error: 'Producto no encontrado' }
    } else {
        products.splice(id, 1);
        resultado = "Producto eliminado con éxito"
    }
    res.json(resultado);
})


module.exports = router;