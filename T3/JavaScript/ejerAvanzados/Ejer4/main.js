function cambiarModo() {
    if (document.body.className == "modoClaro") {
        document.body.className = "modoOscuro";
        document.getElementById("boton").value = "Cambiar a Modo Claro";
    }
    else {
        document.body.className = "modoClaro";
        document.getElementById("boton").value = "Cambiar a Modo Oscuro";
    }
}