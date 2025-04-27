const Ajv = require("ajv");
const evento1 = {
    "$schema": "./esquema.json",
    "fechaIni": "2025-04-12",
    "fechaFin": "2025-04-13"
}
const evento2 = {
    "$schema": "./esquema.json",
    "fechaIni": "2025-04-12",
    "fechaFin": "2025-04-11"
}

document.addEventListener("DOMContentLoaded", function() {
    
    if (evento1.fechaIni >= evento1.fechaFin) {
        console.log("El evento 1 es incorrecto.");
    } else {
        console.log("El evento 1 es correcto.");
    }
    
    if (evento2.fechaIni >= evento2.fechaFin) {
        console.log("El evento 2 es incorrecto.");
    } else {
        console.log("El evento 2 es correcto.");
    }
})