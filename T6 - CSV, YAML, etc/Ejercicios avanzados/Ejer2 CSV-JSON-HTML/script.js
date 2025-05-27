document.addEventListener("DOMContentLoaded",principal);
async function principal(){

    const respuesta = await fetch("ej2_usuarios.csv");
    const csvText = await respuesta.text();
    const data = csvToJson(csvText);
    renderTabla(data);
    
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

function renderTabla(datos) {
    const tabla = document.querySelector("table");

    const thead = document.createElement("thead");
    const trCabecera = document.createElement("tr");

    const claves = Object.keys(datos[0]);
    for (let i = 0; i < claves.length; i++) {
        const th = document.createElement("th");
        th.textContent = claves[i];
        trCabecera.appendChild(th);
    }
    thead.appendChild(trCabecera);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");
    for (let i = 0; i < datos.length; i++) {
        const fila = datos[i];
        const tr = document.createElement("tr");

        for (let j = 0; j < claves.length; j++) {
            const clave = claves[j];
            const td = document.createElement("td");
            td.textContent = fila[clave];
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    tabla.appendChild(tbody);
}