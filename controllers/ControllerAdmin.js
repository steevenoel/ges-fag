var db = require('../database/database');


/** Pagee d'accueul de l'administrateur */
exports.home = (req, res)=>{
    res.render('admin/home', { titre : "Accueil  administrateur" })
}

/**  Page de gestion des provinces */
exports.provinces = (req, res )=>{
    db.query("SELECT * FROM provinces ", (error, result) =>{
        res.render('admin/provinces', { titre : "Gestion des provinces", data : result })
      });
}


/** Fonction d'ajout d'une province */
exports.createprovince = (req, res )=>{

    let { libelle , acronyme } = req.body ;

    console.log( req.body)

    if (libelle && acronyme ) {

        db.query('SELECT * FROM provinces WHERE libelle = ? ',[ libelle ] , (error, result) =>{

            if (error) {
                console.log(error);
            }

           if (result.length > 0) {
                res.json({"response" : false, titre : "Province existante" ,message : "Désolé cette province existe déja"} )
            }else{

                db.query('INSERT INTO provinces SET ?', { libelle : libelle, acronyme : acronyme }, (error2, result2)=>{

                    if (error2) {
                        res.json({"response" : false, titre : "Erreur" ,message : "Erreur de donné"} )
                    } else {
                        console.log(result2)
                        res.json({"response" : true, titre : "Province ajoutée" ,message : "Enregistrement éfféctuée avec succès!"} )
                    }
                })
            }

        })
        
    } else {
         res.json({"response" : false, titre : "Champ(s) vide(s)" ,message : "Veuillez remplire tous les champs!"} )
    }

}


/** Fonction de suppression d'une province */
exports.deleteprovince = (req, res) =>{

    let { id } = req.body ;

    if (id) {
  
      db.query("DELETE FROM provinces WHERE id = ?", [id], (err , result)=>{
  
        if (!err) {
          res.json({ response : true , titre : "Province supprimé", message : "Province supprimé avec succès"})
        } else {
          res.json({ response : false , titre : "Province non supprimé", message : "Province n'a pas été fait"})
        }
      }); 
    } else {
      res.json({ response : false , titre : "Veuillez renseigner le libelle du role"})
    }

}

/** Fonction de modification d'une province */
exports.updateprovince = (req, res )=>{

    let {id , libelle , acronyme } =  req.body ;
  
    if (id && libelle && acronyme ) {
  
      db.query("SELECT * FROM provinces WHERE id = ? ", [ id ],(err1, resultat1)=>{
  
          if (resultat1.length > 0) {
  
            db.query("UPDATE provinces SET libelle = ? , acronyme = ?  WHERE id = ? ", [ libelle , acronyme, id ], (err, resultat)=>{
  
              if (!err) {
                  res.json({ response : true , titre : "Modification éffectuée avec succès", message : "Modification éffectuée avec succès"})
              } else {
                  res.json({ response : false , titre : "Modification n'a pas été éffecté", message : "Modification non éffectuée "})
              }
          })
          } else {
            res.json({ response : false , titre : "Cette province n'existe pas"}) 
          }
  
      });
      
    } else {
       res.json({ response : false , titre : "Veuillez renseigner le libelle du role"})
    }
  
  }

/**  Page de gestion des gammes */
exports.gamme = (req, res) => {
    db.query("SELECT * FROM gammes ", (error, result) => {
        res.render('admin/gammes', { titre: "Gestion des gammes", data: result })
    });
}

/** Fonction d'ajout d'une gamme */
exports.creategamme = (req, res )=>{

    let { libelle , acronyme } = req.body ;

    console.log( req.body)

    if (libelle && acronyme ) {

        db.query('SELECT * FROM gammes WHERE libelle = ? ',[ libelle ] , (error, result) =>{

            if (error) {
                console.log(error);
            }

           if (result.length > 0) {
                res.json({"response" : false, titre : "Gamme existante" ,message : "Désolé cette Gamme existe déja"} )
            }else{

                db.query('INSERT INTO gammes SET ?', { libelle : libelle, acronyme : acronyme }, (error2, result2)=>{

                    if (error2) {
                        res.json({"response" : false, titre : "Erreur" ,message : "Erreur de donné"} )
                    } else {
                        console.log(result2)
                        res.json({"response" : true, titre : "Gamme ajoutée" ,message : "Enregistrement éfféctuée avec succès!"} )
                    }
                })
            }

        })
        
    } else {
         res.json({"response" : false, titre : "Champ(s) vide(s)" ,message : "Veuillez remplire tous les champs!"} )
    }

}

/** Fonction de suppression d'une gamme */
exports.deletegamme= (req, res) =>{

    let { id } = req.body ;

    if (id) {
  
      db.query("DELETE FROM gammes WHERE id = ?", [id], (err , result)=>{
  
        if (!err) {
          res.json({ response : true , titre : "Gamme supprimé", message : "Gamme supprimé avec succès"})
        } else {
          res.json({ response : false , titre : "Gamme non supprimé", message : "Gamme n'a pas été fait"})
        }
      }); 
    } else {
      res.json({ response : false , titre : "Veuillez renseigner le libelle du role"})
    }

}

/** Fonction de modification d'une gamme */
exports.updategamme= (req, res )=>{

    let {id , libelle , acronyme } =  req.body ;
  
    if (id && libelle && acronyme ) {
  
      db.query("SELECT * FROM gammes WHERE id = ? ", [ id ],(err1, resultat1)=>{
  
          if (resultat1.length > 0) {
  
            db.query("UPDATE gammes SET libelle = ? , acronyme = ?  WHERE id = ? ", [ libelle , acronyme, id ], (err, resultat)=>{
  
              if (!err) {
                  res.json({ response : true , titre : "Modification éffectuée avec succès", message : "Modification éffectuée avec succès"})
              } else {
                  res.json({ response : false , titre : "Modification n'a pas été éffecté", message : "Modification non éffectuée "})
              }
          })
          } else {
            res.json({ response : false , titre : "Cette Gamme n'existe pas"}) 
          }
  
      });
      
    } else {
       res.json({ response : false , titre : "Veuillez renseigner le libelle de la gamme"})
    }
  
  }