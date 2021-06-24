// @ts-nocheck
/**
 * Arquivo responsável pelas rotas da api relacionado a classe 'PAGAMENTO'
 */

 const router = require('express-promise-router')();
 const pagamentoController = require('../controllers/pagamento-controller');
 
 // ==> Definir as rotas da classe Evento:
 
 // ==> Rota responsável por criar um novo Pagamento: (POST): localhost:3000/api/eventos
 router.post('/pagamento', pagamentoController.createPagamento);

 // ==> Rota responsável por listar todos os Pagamentos: (GET): localhost:3000/api/eventos
 router.get('/pagamento', pagamentoController.listAllPagamentos);


 module.exports = router;