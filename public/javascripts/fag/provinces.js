document.addEventListener("DOMContentLoaded", function () {
    // Datatables Responsive
    $("#datatables-reponsive").DataTable({
        responsive: true,
        "searching": false,
        "order": [[1, "desc"]],
        "language": {
            "sEmptyTable": "Aucune donnée disponible dans le tableau",
            "sInfo": "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
            "sInfoEmpty": "Affichage de l'élément 0 à 0 sur 0 élément",
            "sInfoFiltered": "(filtré à partir de _MAX_ éléments au total)",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "Afficher _MENU_ éléments",
            "sLoadingRecords": "Chargement...",
            "sProcessing": "Traitement...",
            "sSearch": "Rechercher :",
            "sZeroRecords": "Aucun élément correspondant trouvé",
            "oPaginate": {
                "sFirst": "Premier",
                "sLast": "Dernier",
                "sNext": "Suivant",
                "sPrevious": "Précédent"
            },
            "oAria": {
                "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
            },
            "select": {
                "rows": {
                    "_": "%d lignes sélectionnées",
                    "0": "Aucune ligne sélectionnée",
                    "1": "1 ligne sélectionnée"
                }
            }
        }
    });
});


let formulaire = document.querySelector('#createprovince');

formulaire.addEventListener("submit", (e) => {

    e.preventDefault();

    let libelleNode = document.querySelector("#libelle");
    let acronymeNode = document.querySelector("#acronyme");

    verifInput(libelleNode); verifInput(acronymeNode);

    if (libelleNode.value != "" && acronymeNode.value != "") {

        let libelle = libelleNode.value;
        let acronyme = acronymeNode.value;
        let formData = { libelle, acronyme };

        Swal.fire({
            title: "Traitement en cours ...",
            html: '<img src="../../images/loader.svg" width="100">',
            showCancelButton: false,
            showConfirmButton: false,
        }).then(
            () => { },

            fetch('/fag/provinces', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then((res) => {

                if (res.response) {
                    swal.fire(res.titre, res.message, "success");
                    setTimeout(function () {
                        location.reload();
                    }, 500)
                } else {
                    swal.fire(res.titre, res.message, "error");
                }

            })
        )
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Veuillez remplire tous les champs!',
            text: 'Il y\'a des champs vide dans le formulaire!',

        })
    }

});



/** Fonction de suppression d'une province */
let supprimer = document.querySelectorAll(".supprimer");

supprimer.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        let id = el.dataset.id;
        let libelle = el.dataset.libelle;

        Swal.fire({
            title: 'Êtes vous sur de supprimer cette province ' + libelle + ' ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1cbb8c',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, je veux supprimer ',
            cancelButtonText: 'Annuler'
        }).then((result) => {

            if (result.isConfirmed) {

                let formData = { id };

                Swal.fire({
                    title: "Traitement en cours ...",
                    html: '<img src="../../images/loader.svg" width="100">',
                    showCancelButton: false,
                    showConfirmButton: false,
                }).then(
                    () => { },

                    fetch('/fag/supprimer-province', {
                        method: 'POST',
                        body: JSON.stringify(formData),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json()).then((res) => {

                        if (res.response) {
                            swal.fire(res.titre, res.message, "success");
                            setTimeout(function () {
                                location.reload();
                            }, 1000)
                        } else {
                            swal.fire(res.titre, res.message, "error");
                        }

                    })
                )
            }
        })
    })
});


/** Fonction de modification */
let modifier = document.querySelectorAll(".modifier");
modifier.forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector('#idm').value = el.dataset.id;
        document.querySelector('#libellem').value = el.dataset.libelle;
        document.querySelector('#acronymem').value = el.dataset.acronyme;
        // sortie de la modale
        var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'))
        myModal.show()
    })
});


/** Fonction de suppression d'une province */
let formulaireM = document.querySelectorAll("#updateprovince");

updateprovince.addEventListener("submit", (e) => {

    e.preventDefault();

    let libelleNode = document.querySelector("#libellem");
    let acronymeNode = document.querySelector("#acronymem");
    let idNode = document.querySelector("#idm");

    verifInput(libelleNode); verifInput(acronymeNode); verifInput(idNode);

    if (libelleNode.value != "" && acronymeNode.value != "" && idNode.value != "") {

        let libelle = libelleNode.value;
        let acronyme = acronymeNode.value;
        let id = idNode.value;
        let formData = { id, libelle, acronyme };

        Swal.fire({
            title: "Traitement en cours ...",
            html: '<img src="../../images/loader.svg" width="100">',
            showCancelButton: false,
            showConfirmButton: false,
        }).then(
            () => { },

            fetch('/fag/update-province', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then((res) => {

                if (res.response) {
                    swal.fire(res.titre, res.message, "success");
                    setTimeout(function () {
                        location.reload();
                    }, 500)
                } else {
                    swal.fire(res.titre, res.message, "error");
                }
            })
        )
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Veuillez remplire tous les champs!',
            text: 'Il y\'a des champs vide dans le formulaire!',
        })
    }
});
