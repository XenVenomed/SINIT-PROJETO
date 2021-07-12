const router = require("express-promise-router")();

const viaturaController = require("../controllers/viatura-controller");
router.post("/viatura", viaturaController.addViatura);
router.post("/viatura/nif", viaturaController.ViaturaFromCidadão);

module.exports = router;
