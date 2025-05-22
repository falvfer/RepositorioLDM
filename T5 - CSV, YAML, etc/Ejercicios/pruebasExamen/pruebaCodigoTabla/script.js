//Conversor de CSV a JSON
async function csvToJson() {
    try {
        const respuesta = await fetch("ej2_usuarios.csv");
        const textoCSV = await respuesta.text();

        const resultado = Papa.parse(textoCSV, {header: true, skipEmptyLines: true});

        mostrarTabla(resultado.data);
        //console.log(resultado);
        //document.getElementById("salida").textContent = JSON.stringify(resultado.data, null, 2);
    } catch (error) {
        document.getElementById("salida").textContent = "Error al cargar el archivo.";
        console.error(error);
    }
    
}
//muestra el resultado como una tabla HTML
function mostrarTabla(datos){
    const tabla = document.createElement("table");
    const contenedor = document.getElementById("salida");
    var cabeceras = Object.keys(datos[0]);
    console.log(cabeceras);
    const filaEncabezados = document.createElement("tr");
    //añadimos a la fila de encabezados las cabeceras
    for(let i=0; i<cabeceras.length;i++){
        const celda = document.createElement("th");
        celda.textContent = cabeceras[i];
        filaEncabezados.appendChild(celda);
    }
    //añadimos la fila de encabezados a la tabla
    tabla.appendChild(filaEncabezados);
    //añadimos el resto de filas y celdas
    
    for(let j=0; j<datos.length;j++){
        const fila = document.createElement("tr");
        for(let k=0; k<cabeceras.length;k++){
            const celda = document.createElement("td");
            celda.textContent = datos[j][cabeceras[k]];
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    console.log(tabla);
    contenedor.appendChild(tabla);
}