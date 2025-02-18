// Función con la expresión regular para validar el email.
function validarEmail(correo) {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(correo);
}

// Función para probar rápidamente si un valor es nulo o no (Si es una cadena vacía).
function notNull(texto) {
    return (texto != "");
}

// Método llamado cuando se envia el formulario, comprueva la validez de los datos y después
// llama a la función "volverAIndex".
function validarYVolver(e) {
    e.preventDefault(); // Evitar que se recarge la página

    let correo = document.getElementById("correo").value;
    let nombre = document.getElementById("nombre").value;
    let problema = document.getElementById("problema").value;

    if (!(notNull(nombre) && notNull(correo) && notNull(problema)))
        alert("Introduzca todos los datos");
    else if (!validarEmail(correo))
        alert("¡Correo no válido!");
    else
        volverAIndex();
}

// Función llamada cada vez que se entra a la página para poder cargar los datos del enlace, el cual se encarga
// la página "contacto" de ponerlo acorde a lo que haya hecho el usuario.
function cargarUrl() {
    var parametrosUrl = new URLSearchParams(window.location.search);
    var motivoSel = parametrosUrl.get('motivo');
    var motivoBus = parametrosUrl.get('buscar');
    
    if (motivoSel) {
        document.getElementById("motivo").value = motivoSel;
    } else if (motivoBus) {
        document.getElementById("motivo").value = "otro";
        document.getElementById("problema").append(`Buenas, le contacto porque tengo un problema: \n${motivoBus} `);
    }
}

// Método para cambiar el contenido del main por un botón para volver a la página principal del sitio web.
function volverAIndex() {
    let mainVar = document.getElementById("main");
    mainVar.classList = "d-flex justify-content-center align-items-center flex-grow-1 text-center";
    mainVar.innerHTML =
        "<div>" +
            "<h1 class=\"mb-4\">" +
                "¡Gracias por su paciencia!" +
            "</h1>" +
            "<a href=\"../index.html\"><input type=\"button\" value=\"Volver al inicio\" class=\"rounded-3 border-0 bgSecondColor p-1 px-3\"></a>" +
        "</div>";
}