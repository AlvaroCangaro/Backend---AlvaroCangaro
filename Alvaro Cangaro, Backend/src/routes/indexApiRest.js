const { Router } = require("express");
const { getAll, getProductById, postProduct, putProduct, deleteProduct } = require("../controllers/apiRestControllers");
const router = Router();

router.get("/", getAll);
router.get("/:id", getProductById);
router.post("/", postProduct)
router.put("/:id", putProduct)
router.delete("/:id", deleteProduct)

module.exports = router;