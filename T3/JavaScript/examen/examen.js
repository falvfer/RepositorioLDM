/**
 * Nota para el ejercicio: Puedes usar Control+F y buscar "Ejercicio X" cambiando X por el número del ejercicio para
 * poder ver todas las partes de ese ejercicio, ya que algunas partes veo mejor ponerlas en otros sitios, y otras
 * son modificaciones a otros ejercicios.
 */
document.addEventListener("DOMContentLoaded", function() {

    // Creacion de constantes y variables que se van a usar en los ejercicios
    var arrCajas = [];
    const cajas = document.getElementById("zonaCajas");
    const contenedor = document.getElementById("contenedor");
    /* Nota: Originalmente lo hice con un array, después creé el método para generar colores aleatorios.
    var colores = [];
    colores.push("aqua", "red", "gray", "green", "blueviolet", "skyblue", "salmon",
        "sandybrown", "firebrick", "chartreuse", "darkcyan", "wheat", "rosybrown",
        "ivory", "paleturquoise", "violet", "cadetblue");*/

    // Inicio de Ejercicio 5
        var parrafo = document.createElement("p");
        parrafo.innerHTML = "Número de Cajas: <span id=\"contador\">0</span>";
        contenedor.insertBefore(parrafo, document.getElementById("zonaCajas"));
        var contador = document.getElementById("contador");
    // Fin de Ejercicio 5


    // Creación del botón para el Ejercicio 5 y 6
        var botonEliminar = document.createElement("input");
        botonEliminar.type = "button";
        botonEliminar.value = "Eliminar Caja";
        botonEliminar.addEventListener("click", rmCaja);
        contenedor.appendChild(botonEliminar);
    // Fin de creación del botón para el Ejercicio 5 y 6

    
    // Inicio de Ejercicio 7
        var botonRestablecer = document.createElement("input");
        botonRestablecer.type = "button";
        botonRestablecer.value = "Restablecer";
        botonRestablecer.addEventListener("click", restablecer);
        contenedor.append(" "); //  Dejar un hueco entre los botones
        contenedor.appendChild(botonRestablecer);

        function restablecer() {
            cajas.innerHTML = "";
            contador.innerHTML = 0;
            arrCajas = cajas.getElementsByClassName("caja");
        }
    // Fin de Ejercicio 7


    // Inicio de Ejercicio 1
        function addCaja() {
            var caja = document.createElement("div");
            caja.setAttribute("class", "caja");

            // Inicio de modificación para Ejercicio 2
                caja.innerHTML = Number.parseInt(Math.random()*100+1);
                // caja.style = "background-color: " + colores[Number.parseInt(Math.random()*colores.length)] + ";";
                caja.style = "background-color: " + generarColorAleatorio() + ";";
            // Fin de modificación para Ejercicio 2

            // Inicio de modificación para Ejercicio 4
                caja.addEventListener("mouseenter", addResaltado);
                caja.addEventListener("mouseleave", rmResaltado);
            // Fin de modificación para Ejercicio 4

            // Inicio de modificación para Ejercicio 5
                contador.innerHTML = Number.parseInt(contador.innerHTML) + 1;
            // Fin de modificación para Ejercicio 5
            
            cajas.appendChild(caja);

            arrCajas = cajas.getElementsByClassName("caja");
        }

        document.getElementById("crearCaja").addEventListener("click", addCaja);
    // Fin de Ejercicio 1


    // Inicio de Ejercicio 3
        function cambiarColor() {
            
            for (let i = 0; i < arrCajas.length; i++) {
                // arrCajas[i].style = "background-color: " + colores[Number.parseInt(Math.random()*colores.length)] + ";";
                arrCajas[i].style = "background-color: " + generarColorAleatorio() + ";";
            }
            
        }

        document.getElementById("cambiarColor").addEventListener("click", cambiarColor);
    // Fin de Ejercicio 3


    // Inicio de Ejercicio 4
        function addResaltado() {
            this.setAttribute("class", "caja resaltado");
        }

        function rmResaltado() {
            this.setAttribute("class", "caja");
        }
    // Fin de Ejercicio 4


    // Inicio de Ejercicio 6
        function rmCaja() {
            
            var numCajaEliminar = prompt("Introduzca el número de la caja que quiere eliminar:");
            if (numCajaEliminar >= 1 && numCajaEliminar <= 100) {
                for (let i = 0; i < arrCajas.length; i++) {
                    if (arrCajas[i].innerHTML == numCajaEliminar) {
                        cajas.removeChild(arrCajas[i]);
                        contador.innerHTML = Number.parseInt(contador.innerHTML) - 1;
                    }
                }
            }
        }
    // Fin de Ejercicio 6

    /**
     * Función para generar codigos de colores aleatorios.
     */
    function generarColorAleatorio() {
        var color = "#";
        var valor;
        for (let i = 1; i <= 6; i++) {
            valor = Number.parseInt(Math.random()*16);
            if (valor < 10) 
                color += valor;
            else {
                switch (valor) {
                    case 10: color += "A"; break;
                    case 11: color += "B"; break;
                    case 12: color += "C"; break;
                    case 13: color += "D"; break;
                    case 14: color += "E"; break;
                    default: color += "F"; break;
                }
            }
        }
        return color;
    }

});