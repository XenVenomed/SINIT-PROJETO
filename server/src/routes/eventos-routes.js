const router = require("express-promise-router")();

const eventosController = require("../controllers/eventos-controller");
router.get("/eventos", eventosController.getAllEvents);
router.post("/eventos/info", eventosController.getEventInfo);
router.post("/eventos", eventosController.EventsToCidadao);
router.post("/eventos/nif", eventosController.EventsFromCidadao);

module.exports = router;
