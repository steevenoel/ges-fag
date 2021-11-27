var express = require('express');
var router = express.Router();
const controller = require('../controllers/ControllerAdmin');

/* route pour la page d'accueil */
router.get('/', controller.home);
router.get('/provinces', controller.provinces);
router.post('/provinces', controller.createprovince);
router.post('/supprimer-province', controller.deleteprovince);
router.post('/update-province', controller.updateprovince);

module.exports = router;
