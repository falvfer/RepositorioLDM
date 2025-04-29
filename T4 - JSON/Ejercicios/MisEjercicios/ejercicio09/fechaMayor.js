async function validarDatosBien() {
    try {
        // Cargar el parrafo con id resultado
        const resultado = document.getElementById("resultado");

        // Cargar JSON Schema
        const schemaResponse = await fetch("esquema.json");
        const schema = await schemaResponse.json();
        
        // Instanciar AJV
        const ajv = new Ajv();

        // Cargar datos
        const datosBien = await fetch("datosBien.json");
        const datos = await datosBien.json();

        // Compilar y validar
        const validar = ajv.compile(schema);
        const valido = validar(datos);

        // Mostrar resultado
        if (valido && datos.fechaIni <= datos.fechaFin) {
            resultado.innerHTML = "JSON Correcto: Fecha correcta";
        } else {
            resultado.innerHTML = "JSON Incorrecto: Fecha incorrecta";
            if (!valido)
                resultado.innerHTML += ", errores: " + JSON.stringify(validar.errors, null, 2);
        }
    } catch (error) {
        console.log("Error cargando los archivos:" + error);
        resultado.innerHTML = "Error cargando los archivos:" + error;
    }
}

async function validarDatosMal() {
    try {
        // Cargar el parrafo con id resultado
        const resultado = document.getElementById("resultado");

        // Cargar JSON Schema
        const schemaResponse = await fetch("esquema.json");
        const schema = await schemaResponse.json();
        
        // Instanciar AJV
        const ajv = new Ajv();

        // Cargar datos
        const datosMal = await fetch("datosMal.json");
        const datos = await datosMal.json();

        // Compilar y validar
        const validar = ajv.compile(schema);
        const valido = validar(datos);

        // Mostrar resultado
        if (valido && datos.fechaIni <= datos.fechaFin) {
            resultado.innerHTML = "JSON Correcto: Fecha correcta";
        } else {
            resultado.innerHTML = "JSON Incorrecto: Fecha incorrecta";
            if (!valido)
                resultado.innerHTML += ", errores: " + JSON.stringify(validar.errors, null, 2);
        }
    } catch (error) {
        resultado.innerHTML = "Error cargando los archivos:" + error;
    }
}