
/** Fonction de verification des champs de formulaire */
function verifInput (input) {

    if (input.value == "") {
        input.style.border = "1px solid red";
    } else {
        input.style.border = "1px solid green";
    }
}