async function validarJSON() {
    try {
        // Cargar JSON Schema y datos
        const schemaResponse = await fetch("schema.json");
        const schema = await schemaResponse.json();

        const datosResponse = await fetch("datos.json");
        const datos = await datosResponse.json();

        // Instanciar AJV
        const ajv = new Ajv();

        // Compilar y validar
        const validar = ajv.compile(schema);
        const valido = validar(datos);

        // Mostrar resultado
        const resultado = document.getElementById("resultado");
        if (valido) {
            resultado.innerHTML = "✅ JSON válido";//emojis copiados de https://emojipedia.org/
            console.log("✅ JSON válido");
        } else {
            resultado.innerHTML = "❌ Errores: " + JSON.stringify(validar.errors, null, 2);
            console.error("❌ Errores:", validar.errors);
        }
    } catch (error) {
        console.error("Error cargando los archivos:", error);
    }
}
