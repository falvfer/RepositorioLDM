document.addEventListener("DOMContentLoaded", principal);

async function principal() {
    const respuesta = await fetch("ej5_alumnosIncompletos.csv");
    const csv = await respuesta.text();

    const datos = csvToJson(csv);
    validarDatos(datos);
}

function csvToJson(csv) {
    const lineas = csv.trim().split("\n");
    const cabeceras = lineas[0].split(",");
    const resultado = [];

    for (let i = 1; i < lineas.length; i++) {
        const fila = lineas[i].split(",");
        const obj = {};

        for (let j = 0; j < cabeceras.length; j++) {
            let valor = fila[j] !== undefined ? fila[j].trim() : "";
            obj[cabeceras[j]] = valor;
        }

        resultado.push(obj);
    }

    return resultado;
}

function validarDatos(alumnos) {
    const listaValidos = document.getElementById("validos");
    const listaErrores = document.getElementById("errores");

    for (let i = 0; i < alumnos.length; i++) {
        const alumno = alumnos[i];

        const nombre = alumno.nombre?.trim();
        const edad = alumno.edad?.trim();

        const li = document.createElement("li");
        const errores = [];

        if (!nombre) errores.push("nombre");
        if (!edad || isNaN(edad)) errores.push("edad");

        if (errores.length === 0) {
            li.textContent = `Nombre: ${nombre}, Edad: ${edad}`;
            listaValidos.appendChild(li);
        } else {
            li.textContent = `Fila ${i + 2}: Falta ${errores.join(" y ")}`;
            listaErrores.appendChild(li);
        }
    }
}
