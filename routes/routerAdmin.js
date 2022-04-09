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
router.post('/materiels', controller.createmateriel);
router.post('/supprimer-materiel', controller.deletemateriel);
router.post('/update-materiel', controller.updatemateriel);

/**Routes pour les villes  */
router.get('/villes', controller.villes);
router.post('/villes', controller.createville);
router.post('/supprimer-ville', controller.deleteville);
router.post('/update-ville', controller.updateville);


/*Routes pour les utilisateurs */
router.get('/utilisateurs', controller.utilisateurs);
router.post('/utilisateurs', controller.createutilisateur);
router.post('/supprimer-utilisateur', controller.deleteutilisateur);
router.post('/update-utilisateur', controller.updateutilisateur);

/*Routes pour les  Roles*/
router.get('/roles', controller.roles);
router.post('/roles', controller.createrole);
router.post('/supprimer-role', controller.deleterole);
router.post('/update-role', controller.updaterole);


/*Routes pour les  Armees*/
router.get('/armees', controller.armees);
router.post('/armees', controller.createarmee);
router.post('/supprimer-armee', controller.deletearmee);
router.post('/update-armee', controller.updatearmee);

/*Routes typemateriels*/
router.get('/typemateriels', controller.typemateriels);
router.post('/typemateriels', controller.createtypemateriel);
router.post('/supprimer-typemateriel', controller.deletetypemateriel);
router.post('/update-typemateriel', controller.updatetypemateriel);

/*Routes pour affectation*/
router.get('/affectations', controller.affectations);
router.post('/affectations', controller.createaffectation);
router.post('/supprimer-affectation', controller.deleteaffectation);
router.post('/update-affectation', controller.updateaffectation);

/*Routes pour  les demandesMateriel*/
 router.get('/demandesMateriels', controller.demandesMateriels);
 router.post('/demandesMateriels', controller.createdemandemateriel);
 router.post('/supprimer-demandeMateriel', controller.deletedemandemateriel);	

/*Routes pour les affectations*/
router.get('/affectations', controller.affectations);
router.post('/affectations', controller.createaffectation);
router.post('/supprimer-affectation', controller.deleteaffectation);
router.post('/update-affectation', controller.updateaffectation);	

/*Routes Pour  les Regiments*/
router.get('/regiments', controller.regiments);
router.post('/regiments', controller.createregiment);
router.post('/supprimer-regiment', controller.deleteregiment);
router.post('/update-regiment', controller.updateregiment);



module.exports = router

