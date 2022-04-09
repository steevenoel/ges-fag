const express = require('express');
var db = require('../database/database');


/** Pagee d'accueul de l'administrateur */
exports.home = (req, res) => {
  res.render('admin/home', { titre: "Accueil  administrateur" })
}

/**  Page de gestion des provinces */
exports.provinces = (req, res) => {
  db.query("SELECT * FROM provinces ", (error, result) => {
    res.render('admin/provinces', { titre: "Gestion des provinces", data: result })
  });
}


/** Fonction d'ajout d'une province */
exports.createprovince = (req, res) => {

  let { libelle, acronyme } = req.body;

  console.log(req.body)

  if (libelle && acronyme) {

    db.query('SELECT * FROM provinces WHERE libelle = ? ', [libelle], (error, result) => {

      if (error) {
        console.log(error);
      }

      if (result.length > 0) {
        res.json({ "response": false, titre: "Province existante", message: "Désolé cette province existe déja" })
      } else {

        db.query('INSERT INTO provinces SET ?', { libelle: libelle, acronyme: acronyme }, (error2, result2) => {

          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Province ajoutée", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }

    })

  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }

}


/** Fonction de suppression d'une province */
exports.deleteprovince = (req, res) => {

  let { id } = req.body;

  if (id) {

    db.query("DELETE FROM provinces WHERE id = ?", [id], (err, result) => {

      if (!err) {
        res.json({ response: true, titre: "Province supprimé", message: "Province supprimé avec succès" })
      } else {
        res.json({ response: false, titre: "Province non supprimé", message: "Province n'a pas été fait" })
      }
    });
  } else {
    res.json({ response: false, titre: "Veuillez renseigner le libelle du role" })
  }

}

/** Fonction de modification d'une province */
exports.updateprovince = (req, res) => {

  let { id, libelle, acronyme } = req.body;

  if (id && libelle && acronyme) {

    db.query("SELECT * FROM provinces WHERE id = ? ", [id], (err1, resultat1) => {

      if (resultat1.length > 0) {

        db.query("UPDATE provinces SET libelle = ? , acronyme = ?  WHERE id = ? ", [libelle, acronyme, id], (err, resultat) => {

          if (!err) {
            res.json({ response: true, titre: "Modification éffectuée avec succès", message: "Modification éffectuée avec succès" })
          } else {
            res.json({ response: false, titre: "Modification n'a pas été éffecté", message: "Modification non éffectuée " })
          }
        })
      } else {
        res.json({ response: false, titre: "Cette province n'existe pas" })
      }

    });

  } else {
    res.json({ response: false, titre: "Veuillez renseigner le libelle du role" })
  }

}

/**  Page de gestion des gammes */
exports.gamme = (req, res) => {
  db.query("SELECT * FROM gammes ", (error, result) => {
    res.render('admin/gammes', { titre: "Gestion des gammes", data: result })
  });
}

/** Liste des gammes */
exports.listegamme = (req, res) => {
  db.query("SELECT * FROM gammes ", (error, result) => {
    res.json({ data: result });
  });
}

/** Fonction d'ajout d'une gamme */
exports.creategamme = (req, res) => {

  let { libelle, acronyme } = req.body;

  console.log(req.body)

  if (libelle && acronyme) {

    db.query('SELECT * FROM gammes WHERE libelle = ? ', [libelle], (error, result) => {

      if (error) {
        console.log(error);
      }

      if (result.length > 0) {
        res.json({ "response": false, titre: "Gamme existante", message: "Désolé cette Gamme existe déja" })
      } else {

        db.query('INSERT INTO gammes SET ?', { libelle: libelle, acronyme: acronyme }, (error2, result2) => {

          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Gamme ajoutée", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }

    })

  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }

}

/** Fonction de suppression d'une gamme */
exports.deletegamme = (req, res) => {

  let { id } = req.body;

  if (id) {

    db.query("DELETE FROM gammes WHERE id = ?", [id], (err, result) => {

      if (!err) {
        res.json({ response: true, titre: "Gamme supprimé", message: "Gamme supprimé avec succès" })
      } else {
        res.json({ response: false, titre: "Gamme non supprimé", message: "Gamme n'a pas été fait" })
      }
    });
  } else {
    res.json({ response: false, titre: "Veuillez renseigner le libelle du role" })
  }

}

/** Fonction de modification d'une gamme */
exports.updategamme = (req, res) => {

  let { id, libelle, acronyme } = req.body;

  if (id && libelle && acronyme) {

    db.query("SELECT * FROM gammes WHERE id = ? ", [id], (err1, resultat1) => {

      if (resultat1.length > 0) {

        db.query("UPDATE gammes SET libelle = ? , acronyme = ?  WHERE id = ? ", [libelle, acronyme, id], (err, resultat) => {

          if (!err) {
            res.json({ response: true, titre: "Modification éffectuée avec succès", message: "Modification éffectuée avec succès" })
          } else {
            res.json({ response: false, titre: "Modification n'a pas été éffecté", message: "Modification non éffectuée " })
          }
        })
      } else {
        res.json({ response: false, titre: "Cette Gamme n'existe pas" })
      }

    });

  } else {
    res.json({ response: false, titre: "Veuillez renseigner le libelle de la gamme" })
  }

}

/**  Page de gestion du materiel */
exports.materiels = (req, res) => {
  db.query("SELECT materiels.id AS id , materiels.libelle AS libelle , materiels.gamme_id AS gammeid , materiels.date_crea AS date_crea , gammes.libelle AS gamme FROM materiels INNER JOIN gammes ON materiels.gamme_id = gammes.id", (error, result) => {
    console.log(result);
    res.render('admin/materiels', { titre: "Liste de type de matériel", data: result })
  });
}

/**fonction de creation du materiel */
exports.createmateriel = (req, res) => {
  let { libelle, gamme_id, date_crea, creator_id } = req.body;
  console.log(req.body)
  if (libelle && gamme_id && date_crea && creator_id) {
    db.query('SELECT * FROM materiels WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Materiel existant", message: "Désolé ce matériel existe déja" })
      } else {
        db.query('INSERT INTO materiels SET ?', { libelle: libelle, gamme_id: gamme_id, date_crea: date_crea, creator_id: creator_id }, (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Materiel ajouté", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }
    })
  } else { res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" }) }
}

/** Fonction de modification du materiel */
exports.updatemateriel = (req, res) => {
  let { id, libelle, gamme_id, date_crea, creator_id } = req.body;
  if (id && libelle && gamme_id && date_crea && creator_id) {
    db.query("SELECT * FROM materiels WHERE id = ? ", [id], (err1, resultat1) => {
      if (resultat1.length > 0) {
        db.query("UPDATE materiels SET libelle = ? , gamme_id = ? , date_crea = ? , creator_id = ?  WHERE id = ? ", [libelle, gamme_id, date_crea, creator_id, id], (err, resultat) => {
          if (!err) {
            res.json({ response: true, titre: "Modification éffectuée avec succès", message: "Modification éffectuée avec succès" })
          } else {
            res.json({ response: false, titre: "Modification n'a pas été éffecté", message: "Modification non éffectuée " })
          }
        })
      } else {
        res.json({ response: false, titre: "Ce Materiel n'existe pas" })
      }
    });
  } else {
    res.json({ response: false, titre: "Veuillez renseigner le libelle du materiel" })
  }
}

/** Fonction de suppression du materiel */
exports.deletemateriel = (req, res) => {
  let { id } = req.body;
  if (id) {
    db.query("DELETE FROM materiels WHERE id = ?", [id], (err, result) => {
      if (!err) {
        res.json({ response: true, titre: "Materiel supprimé", message: "Materiel supprimé avec succès" })
      } else {
        res.json({ response: false, titre: "Materiel non supprimé", message: "Materiel n'a pas été fait" })
      }
    });
  } else {
    res.json({ response: false, titre: "Veuillez renseigner le libelle du materiel" })
  }
}


/** page de gestion des Utilisateurs */
exports.users = (req, res) => {
  db.query("SELECT * FROM users ", (error, result) => {
    res.render('admin/utilisateurs', { titre: "Liste des utilisateurs", data: result })
  });
}

/** Fonction d'ajout d'un utilisateur */
exports.createusers = (req, res) => {
  let { login, nom, prenom, contact, grade, mdp, role_id, corps_id, regiment_id, actif, date_crea, creator_id } = req.body;
  console.log(req.body)
  if (login && nom && prenom && contact && grade && mdp && role_id && corps_id && regiment_id && actif && date_crea && creator_id) {

    db.query('SELECT * FROM users WHERE login = ? ', [login], (error, result) => {

      if (error) {
        console.log(error);
      }

      if (result.length > 0) {
        res.json({ "response": false, titre: "Utilisateur existant", message: "Désolé cet utilisateur existe déja" })
      } else {

        db.query('INSERT INTO users SET ?', { login: login, nom: nom, prenom: prenom, contact: contact, grade: grade, mdp: mdp, role_id: role_id, corps_id: corps_id, regiment_id: regiment_id, actif: actif, date_crea: date_crea, creator_id: creator_id }, (error2, result2) => {

          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Utilisateur ajouté", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }

    })

  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/** Fonction de modification d'un utilisateur */
exports.updateutilisateur = (req, res) => {
  let { id, login, nom, prenom, contact, grade, mdp, role_id, corps_id, regiment_id, actif, date_crea, creator_id } = req.body;
  console.log(req.body)
  if (id && login && nom && prenom && contact && grade && mdp && role_id && corps_id && regiment_id && actif && date_crea && creator_id) {

    db.query("SELECT * FROM users WHERE id = ? ", [id], (err1, resultat1) => {

      if (resultat1.length > 0) {

        db.query("UPDATE users SET login = ? , nom = ? , prenom = ? , contact = ? , grade = ? , mdp = ? , role_id = ? , corps_id = ? , regiment_id = ? , actif = ? , date_crea = ? , creator_id = ?  WHERE id = ? ", [login, nom, prenom, contact, grade, mdp, role_id, corps_id, regiment_id, actif, date_crea, creator_id, id], (err, resultat) => {

          if (!err) {
            res.json({ response: true, titre: "Modification éffectuée avec succès", message: "Modification éffectuée avec succès" })
          } else {
            res.json({ response: false, titre: "Modification n'a pas été éffecté", message: "Modification non éffectuée " })
          }
        })
      } else {
        res.json({ response: false, titre: "Cet utilisateur n'existe pas" })
      }

    });

  } else {
    res.json({ response: false, titre: "Veuillez renseigner le libelle de la gamme" })
  }
}

/** Fonction de suppression d'un utilisateur */
exports.deleteutilisateur = (req, res) => {
  let { id } = req.body;
  if (id) {

    db.query("SELECT * FROM users WHERE id = ? ", [id], (err1, resultat1) => {

      if (resultat1.length > 0) {

        db.query("DELETE FROM users WHERE id = ? ", [id], (err, resultat) => {

          if (!err) {
            res.json({ response: true, titre: "Suppression éffectuée avec succès", message: "Suppression éffectuée avec succès" })
          } else {
            res.json({ response: false, titre: "Suppression n'a pas été éffecté", message: "Suppression non éffectuée " })
          }
        })
      } else {
        res.json({ response: false, titre: "Cet utilisateur n'existe pas" })
      }

    });

  } else {
    res.json({ response: false, titre: "Veuillez renseigner l'id de l'utilisateur" })
  }
}

/** liste utilisateur */
exports.listeutilisateur = (req, res) => {
  db.query("SELECT * FROM users ", (error, result) => {
    res.render('admin/listeutilisateur', { titre: "Liste des utilisateurs", data: result })
  });
}


/** page de gestion des Roles */
exports.createRole = (req, res) => {
  let { libelle, accro } = req.body;
  if (libelle && accro) {
    db.query('SELECT * FROM roles WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Role existant", message: "Désolé ce role existe déja" })
      } else {
        db.query('INSERT INTO roles SET ?', { libelle: libelle, accronyme: accro }, (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Role ajouté", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }
    })
  }
}


/** pages ajouts des villes */
exports.createville = (req, res) => {
  let { libelle, accro, } = req.body;
  if (libelle && accro) {
    db.query('SELECT * FROM villes WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Ville existante", message: "Désolé cette ville existe déja" })
      } else {
        db.query('INSERT INTO villes SET ?', { libelle: libelle, accronyme: accro }, (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Ville ajouté", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/** fonction modification villes  */
exports.modifierville = (req, res) => {
  let { id, libelle, accro } = req.body;
  if (id && libelle && accro) {
    db.query('SELECT * FROM villes WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Ville existante", message: "Désolé cette ville existe déja" })
      } else {
        db.query('UPDATE villes SET libelle = ? , accronyme = ? WHERE id = ?', [libelle, accro, id], (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Ville modifié", message: "Modification éfféctuée avec succès!" })
          }
        })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}


/** Gestion des affectiolns  */
exports.affectation = (req, res) => {
  db.query('SELECT * FROM affectation ', (error, result) => {
    console.log(result);
    res.render('admin/affectation', { titre: "Affectation", data: result })
  });
}

/** page creation  des affectations  */
exports.createaffectation = (req, res) => {
  let { etatmajor_id, regiment_id } = req.body;
  if (etatmajor_id && regiment_id) {
    db.query('SELECT * FROM affectation WHERE etatmajor_id = ? AND regiment_id = ? ', [etatmajor_id, regiment_id], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Affectation existante", message: "Désolé cette affectation existe déja" })
      } else {
        db.query('INSERT INTO affectation SET ?', { etatmajor_id: etatmajor_id, regiment_id: regiment_id }, (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Affectation ajouté", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }
    })
  }
}

/** page modification des affectations  */
exports.updateaffectation = (req, res) => {
  let { id, etatmajor_id, regiment_id } = req.body;
  if (id && etatmajor_id && regiment_id) {
    db.query('SELECT * FROM affectation WHERE etatmajor_id = ? AND regiment_id = ? ', [etatmajor_id, regiment_id], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Affectation existante", message: "Désolé cette affectation existe déja" })
      } else {
        db.query('UPDATE affectation SET etatmajor_id = ? , regiment_id = ? WHERE id = ?', [etatmajor_id, regiment_id, id], (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Affectation modifié", message: "Modification éfféctuée avec succès!" })
          }
        })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/** page suppression des affectations  */
exports.deleteaffectation = (req, res) => {
  let { id } = req.body;
  if (id) {
    db.query('DELETE FROM affectation WHERE id = ?', [id], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.affectedRows > 0) {
        res.json({ "response": true, titre: "Affectation supprimé", message: "Suppression éfféctuée avec succès!" })
      } else {
        res.json({ "response": false, titre: "Affectation non supprimé", message: "Désolé cette affectation n'existe pas" })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/** page gestion des types de materiel  */
exports.typemate = (req, res) => {
  db.query('SELECT * FROM type_materiel ', (error, result) => {
    console.log(result);
    res.render('admin/type_materiel', { titre: "Type de matériel", data: result })
  });
}

/** fonction de creation  des types de materiel  */
exports.createtypemate = (req, res) => {
  let{libelle, acro} = req.body;
  console.log(req.body);
  if(libelle && acro){
    db.query('SELECT * FROM type_materiel WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Type de matériel existant", message: "Désolé ce type de matériel existe déja" })
      } else {
        db.query('INSERT INTO type_materiel SET ?', { libelle: libelle, acro: acro }, (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Type de matériel ajouté", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }
    })
  }else{
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/** fonction de modification  des types de materiel  */
exports.updatetypemate = (req, res) => {
  let { id, libelle, acro } = req.body;
  if (id && libelle && acro) {
    db.query('SELECT * FROM type_materiel WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Type de matériel existant", message: "Désolé ce type de matériel existe déja" })
      } else {
        db.query('UPDATE type_materiel SET libelle = ? , acro = ? WHERE id = ?', [libelle, acro, id], (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Type de matériel modifié", message: "Modification éfféctuée avec succès!" })
          }
        })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/*fonction de suppression des types de materiel  */
exports.deletetypemate = (req, res) => {
  let { id } = req.body;
  if (id) {
    db.query('DELETE FROM type_materiel WHERE id = ?', [id], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.affectedRows > 0) {
        res.json({ "response": true, titre: "Type de matériel supprimé", message: "Suppression éfféctuée avec succès!" })
      } else {
        res.json({ "response": false, titre: "Type de matériel non supprimé", message: "Désolé ce type de matériel n'existe pas" })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/** page Gestin Armee  */

exports.armee = (req, res) => {
  db.query('SELECT * FROM armee ', (error, result) => {
    console.log(result);
    res.render('admin/armee', { titre: "Armee", data: result })
  });
}

/** Page Gestion des Regimemts  */
exports.regiments = (req, res) => {
  db.query('SELECT * FROM regiments ', (error, result) => {
    console.log(result);
    res.render('admin/regiments', { titre: "Regiments", data: result })
  });
}

/** Fonction d'ajout d'un regiment */
exports.createregiments = (req, res) => {
  let { libelle } = req.body;
  if (libelle) {
    db.query('SELECT * FROM regiments WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Regiment existant", message: "Désolé ce regiment existe déja" })
      } else {
        db.query('INSERT INTO regiments SET ?', { libelle: libelle }, (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Regiment ajouté", message: "Enregistrement éfféctuée avec succès!" })
          }
        })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}

/** Fonction de modification d'un regiment */
exports.updateregiments = (req, res) => {
  let { id, libelle } = req.body;
  if (id && libelle) {
    db.query('SELECT * FROM regiments WHERE libelle = ? ', [libelle], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.length > 0) {
        res.json({ "response": false, titre: "Regiment existant", message: "Désolé ce regiment existe déja" })
      } else {
        db.query('UPDATE regiments SET libelle = ? WHERE id = ?', [libelle, id], (error2, result2) => {
          if (error2) {
            res.json({ "response": false, titre: "Erreur", message: "Erreur de donné" })
          } else {
            console.log(result2)
            res.json({ "response": true, titre: "Regiment modifié", message: "Modification éfféctuée avec succès!" })
          }
        })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}


/** Fonction de suppression d'un regiment */
exports.deleteregiments = (req, res) => {
  let { id } = req.body;
  if (id) {
    db.query('DELETE FROM regiments WHERE id = ?', [id], (error, result) => {
      if (error) {
        console.log(error);
      }
      if (result.affectedRows > 0) {
        res.json({ "response": true, titre: "Regiment supprimé", message: "Suppression éfféctuée avec succès!" })
      } else {
        res.json({ "response": false, titre: "Regiment non supprimé", message: "Désolé ce regiment n'existe pas" })
      }
    })
  } else {
    res.json({ "response": false, titre: "Champ(s) vide(s)", message: "Veuillez remplire tous les champs!" })
  }
}
