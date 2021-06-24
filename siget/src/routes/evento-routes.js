// @ts-nocheck
/**
 * Arquivo responsável pelas rotas da api relacionado a classe 'EVENTO'
 */

 const router = require('express-promise-router')();
 const eventoController = require('../controllers/evento-controller');
 
 // ==> Definir as rotas da classe Evento:
 
 // ==> Rota responsável por criar um novo Eventos: (POST): localhost:3000/api/eventos
 router.post('/evento', eventoController.createEvento);

 // ==> Rota responsável por listar todos os Eventos: (GET): localhost:3000/api/eventos
router.get('/evento', eventoController.listAllEventos);

// ==> Rota responsável por mudar o pagamento de um Evento: (PUT): localhost:3000/api/eventos
router.put('/evento', eventoController.payEvento);
 
 module.exports = router;