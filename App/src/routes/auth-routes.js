const router = require('express-promise-router')();
const validInfo = require('../middleware/validinfo')

const registerController = require('../controllers/register-controller')
router.post('/register',registerController.registerCidadao)
router.post('/login',validInfo,registerController.loginCidadao)
module.exports = router;