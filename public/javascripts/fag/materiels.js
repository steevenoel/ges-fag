document.addEventListener("DOMContentLoaded", function() {


     // Datatables Responsive
     $("#datatables-reponsive").DataTable({
        responsive: true,
        "searching": false,
        "order": [[1, "asc"]],
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
    

    let gammesNode = document.querySelector('#datalistOptions');

    // recuperation des games 
    fetch('/fag/liste-gamme').then(res => res.json()).then((res)=>{
        
        let operateurs = res.data;
        operateurs.forEach((op)=>{
            let option = document.createElement('option');
            //option.value = op.id ;
            option.dataset.value =  op.id ;
            option.innerText = op.libelle ;
            gammesNode.appendChild(option);
        });
    }).catch((err)=>{
        Swal.fire({
            icon: 'error',
            title: 'Veuillez essayer plutard ',
            text: "Service indisponible pour le moment  ",
        
        })
    })


/*
    // Flatpickr
    flatpickr(".flatpickr-minimum");
    flatpickr(".flatpickr-datetime", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    });
    flatpickr(".flatpickr-human", {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
    });
    flatpickr(".flatpickr-multiple", {
        mode: "multiple",
        dateFormat: "Y-m-d"
    });
    flatpickr(".flatpickr-range", {
        mode: "range",
        dateFormat: "Y-m-d"
    });
    flatpickr(".flatpickr-time", {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });*/
});