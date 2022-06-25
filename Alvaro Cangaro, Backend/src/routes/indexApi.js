const { Router } = require("express");
const { productsView, formView, formSubmit } = require("../controllers/apiControllers");
const router = Router(); //Router

router.get("/", formView);
router.get("/productos", productsView)
router.post("/productos", formSubmit);

module.exports = router;