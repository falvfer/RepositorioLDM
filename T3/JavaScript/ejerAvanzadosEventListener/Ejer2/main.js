document.addEventListener("DOMContentLoaded", function() {
    function convertir() {
        celcius = Number.parseFloat(document.getElementById("celcius").value);
        fahrenheit = document.getElementById("fahrenheit");
    
        if (!isNaN(celcius))
            fahrenheit.value = (celcius*9/5+32) + "ºF";
    }

    document.getElementById("boton").addEventListener("click", convertir);
});

/*
Eventos de ratón (Mouse Events)
    "click" → Se activa cuando el usuario hace clic en el elemento.
    "dblclick" → Se activa con doble clic.
    "mousedown" → Se activa cuando se presiona un botón del ratón.
    "mouseup" → Se activa cuando se suelta un botón del ratón.
    "mousemove" → Se activa cuando el puntero del ratón se mueve sobre un elemento.
    "mouseenter" → Se activa cuando el puntero entra en un elemento.
    "mouseleave" → Se activa cuando el puntero sale de un elemento.
    "contextmenu" → Se activa cuando se hace clic derecho (abre el menú contextual).

Eventos de teclado (Keyboard Events)
    "keydown" → Se activa cuando se presiona una tecla.
    "keyup" → Se activa cuando se suelta una tecla.
    "keypress" → (Obsoleto) Similar a "keydown", pero no detecta todas las teclas.

Eventos de formulario (Form Events)
    "submit" → Se activa cuando se envía un formulario.
    "change" → Se activa cuando un input cambia su valor y pierde el foco.
    "input" → Se activa cuando un input cambia su valor en tiempo real.
    "focus" → Se activa cuando un elemento recibe el foco.
    "blur" → Se activa cuando un elemento pierde el foco.
    "reset" → Se activa cuando se resetea un formulario.

Eventos de ventana (Window Events)
    "load" → Se activa cuando la página y sus recursos han cargado completamente.
    "DOMContentLoaded" → Se activa cuando el HTML ha sido completamente cargado y parseado.
    "resize" → Se activa cuando se cambia el tamaño de la ventana.
    "scroll" → Se activa cuando el usuario hace scroll.

Eventos de arrastrar y soltar (Drag & Drop Events)
    "dragstart" → Se activa cuando comienza a arrastrarse un elemento.
    "drag" → Se activa mientras se arrastra un elemento.
    "dragend" → Se activa cuando se suelta un elemento.
    "dragover" → Se activa cuando un elemento arrastrado está sobre un área de destino.
    "drop" → Se activa cuando se suelta un elemento en un área de destino.
*/