const router = require("express-promise-router")();

const cartaController = require("../controllers/carta-controller");
router.post("/carta", cartaController.addCartaConducao);
router.post("/carta/cidadao", cartaController.selectCartaConducao);
router.post("/carta/evento", cartaController.updateCidadaoInfracao);

module.exports = router;
