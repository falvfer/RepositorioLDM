document.addEventListener("DOMContentLoaded",principal);
async function principal(){

    const respuesta = await fetch("da_aparcamientosBici-25830.csv");
    const csvText = await respuesta.text();
    const data = csvToJson(csvText);
    crearHTML(data);
    
}

function csvToJson(csv) {
    const lineas = csv.trim().split("\n");
    const cabeceras = lineas[0].split(",");
    const resultado = [];

    for (let i = 1; i < lineas.length; i++) {
        const fila = lineas[i].split(",");
        const obj = {};
        for (let j = 0; j < cabeceras.length; j++) {
            const valor = fila[j].trim();
            obj[cabeceras[j]] = isNaN(valor) ? valor : Number(valor);
        }
        resultado.push(obj);
    }

    return resultado;
}

function crearHTML(datos) {
    const contenedor = document.getElementById("contenedor-lista");
    const listaExterna = document.createElement("ul");

    for (let i = 0; i < datos.length; i++) {
        // Crear la lista
        const elemento = document.createElement("li");
        const lista = document.createElement("ul");

        // Crear la etiqueta del nombre
        const tNombre = document.createElement("strong");
            tNombre.append("Nombre: ");

        // Crear la ubicacion
        const ubicacion = document.createElement("li");
        const tUbicacion = document.createElement("strong");
            tUbicacion.append("Ubicación: ");
            ubicacion.appendChild(tUbicacion);
            ubicacion.append(datos[i].DIRECCION);

        // Crear las plazas
        const plazas = document.createElement("li");
        const tPlazas = document.createElement("strong");
            tPlazas.append("Número de plazas: ");
            plazas.appendChild(tPlazas);
            plazas.append(datos[i].NROPLAZAS);

        // Crear la descripcion
        const descripcion = document.createElement("li");
        const tDescripcion = document.createElement("strong");
            tDescripcion.append("Descripción: ");
            descripcion.appendChild(tDescripcion);
            descripcion.append(datos[i].DESCRIPCION);

        // Añadir el nombre
        elemento.appendChild(tNombre);
        elemento.append(datos[i].NOMBRE);
        elemento.appendChild(lista);

        // Añadir los datos
        lista.appendChild(ubicacion);
        lista.appendChild(plazas);
        lista.appendChild(descripcion);

        // Añadirlo a la lista
        listaExterna.appendChild(elemento);
    }

    contenedor.append(listaExterna);

}