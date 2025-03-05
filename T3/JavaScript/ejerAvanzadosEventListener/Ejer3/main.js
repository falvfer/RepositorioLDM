function contar() {
    texto = document.getElementById("textoContar").value;
    regexVocales = /^[aeiouAEIOUáéíóúÁÉÍÓÚ/]$/;
    cont = 0;

    for (let i = 0; i < texto.length; i++) {
        if (regexVocales.test(texto[i]))
            cont++;
    }

    document.getElementById("resultado").innerHTML = "<p>Se han contado un total de " + cont + " vocales.</p>";
}