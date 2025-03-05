function convertir() {
    celcius = Number.parseFloat(document.getElementById("celcius").value);
    fahrenheit = document.getElementById("fahrenheit");

    if (!isNaN(celcius))
        fahrenheit.value = (celcius*9/5+32) + "ºF";
}
