// @ts-nocheck
/**
 * Arquivo responsável pelas rotas da api relacionado a classe 'EVENTO'
 */

 const router = require('express-promise-router')();
 const cidadaoController = require('../controllers/cidadao-controller');
 
 // ==> Definir as rotas da classe Evento:
 
 // ==> Rota responsável por criar um novo Eventos: (POST): localhost:3000/api/eventos
 router.post('/cidadao', cidadaoController.createCidadao);

 // ==> Rota responsável por listar todos os Eventos: (GET): localhost:3000/api/eventos
router.get('/cidadao', cidadaoController.listAllCidadao);
router.get('/eventos', cidadaoController.listAllEvents);

// ==> Rota responsável por mudar o pagamento de um Evento: (PUT): localhost:3000/api/eventos
//router.put('/cidadao', cidadaoController.payEvento);
 
 module.exports = router;