const { Router } = require("express");
const router = Router(); //Router

router.get("/", (req, res) => {
    res.render('index.ejs')
});

module.exports = router