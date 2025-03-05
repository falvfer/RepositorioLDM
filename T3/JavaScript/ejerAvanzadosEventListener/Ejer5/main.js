function iniciarSesion() {
    correo = document.getElementById("correo")
    if(validarEmail(correo.value)) {
        alert("¡Inicio de sesión exitoso!");
        correo.value = "";
    }
    else {
        alert("Correo no válido, vuelva a intentarlo.");
    }
}

function validarEmail(correo) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(correo);
}