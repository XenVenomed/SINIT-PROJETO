const router = require("express-promise-router")();

const pagamentosController = require("../controllers/pagamento-controller");
router.get("/pagamentos", pagamentosController.getAllPagamentos);
router.post("/pagamentos", pagamentosController.getPagamentoOfEvento);

module.exports = router;
