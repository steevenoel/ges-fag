


/** Pagee d'accueul de l'administrateur */
exports.home = (req, res)=>{
    res.render('admin/home', { titre : "Accueil  administrateur" })
}