var express = require('express');
var router = express.Router();
const controller = require('../controllers/ControllerAdmin');

/* route pour la page d'accueil */
router.get('/', controller.home);

module.exports = router;
