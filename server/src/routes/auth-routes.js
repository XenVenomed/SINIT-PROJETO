const router = require("express-promise-router")();
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

const registerController = require("../controllers/register-controller");
router.post("/register", registerController.registerCidadao);
router.post("/login", validInfo, registerController.loginCidadao);
router.post("/verify", authorization, registerController.auth);
router.get("/info", authorization, registerController.verify);
module.exports = router;
