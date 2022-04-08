var express = require('express');
var router = express.Router();
const controller = require('../controllers/ControllerAdmin');

/* route pour la page d'accueil */
router.get('/', controller.home);

/** Routes pour les provinces */
router.get('/provinces', controller.provinces);
router.post('/provinces', controller.createprovince);
router.post('/supprimer-province', controller.deleteprovince);
router.post('/update-province', controller.updateprovince);

/** Routes pour les gammes */
router.get('/gammes', controller.gamme);
router.post('/gammes', controller.creategamme);
router.post('/supprimer-gamme', controller.deletegamme);
router.post('/update-gamme', controller.updategamme);
router.get('/liste-gamme', controller.listegamme);

/** Routes pour le materiel */
router.get('/materiels', controller.materiels);

/**Routes pour les villes  */

/*Routes pour les utilisateurs */

/*Routes pour les  Roles*/

/*Routes pour les  Armees*/

/*Routes typemateriels*/

/*Routes pour affectation*/

/*Routes pour  les demandesMateriel*/

/*Routes pour les affectations*/

/*Routes Pour  les Regiments*/



module.exports = router

