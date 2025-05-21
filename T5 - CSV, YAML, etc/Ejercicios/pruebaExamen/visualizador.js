// Función principal para cargar el archivo JSON local y mostrarlo
async function cargarJSON() {
    try {
        // Se obtiene el archivo JSON local (debes tener ej1_curso.json en el mismo directorio)
        const respuesta = await fetch("./ej1_curso.json");
        const datosCurso = await respuesta.json();
        console.log(datosCurso);
        mostrarDatosSegunModo(datosCurso);
    } catch (error) {
        // En caso de error (archivo no encontrado o mal formado)
        const contenedor = document.getElementById("contenedorSalida");
        contenedor.innerHTML = "<p style='color:red;'>Error al cargar el archivo JSON.</p>";
    }
}

// Función que decide cómo mostrar los datos según el modo elegido
function mostrarDatosSegunModo(datos) {
    const modoSeleccionado = document.getElementById("modoVisualizacion").value;
    const contenedor = document.getElementById("contenedorSalida");
    contenedor.innerHTML = ""; // Limpiar contenido previo

    if (modoSeleccionado === "pre") {
        // Mostrar JSON formateado con indentación dentro de <pre>
        const bloquePre = document.createElement("pre");
        bloquePre.textContent = JSON.stringify(datos, null, 2);
        contenedor.appendChild(bloquePre);
    }

    else if (modoSeleccionado === "table") {
        // Mostrar JSON como tabla (solo si es array de objetos)
        if (!Array.isArray(datos)) {
            contenedor.innerHTML = "<p style='color:red;'>Para mostrar como tabla, el JSON debe ser un array de objetos.</p>";
            return;
        }

        const tabla = document.createElement("table");
        const thead = document.createElement("thead");
        const tbody = document.createElement("tbody");

        // Obtener encabezados (claves) del primer objeto
        const encabezados = Object.keys(datos[0]);

        // Crear fila de encabezado
        const filaEncabezado = document.createElement("tr");
        for (const encabezado of encabezados) {
            const th = document.createElement("th");
            th.textContent = encabezado;
            filaEncabezado.appendChild(th);
        }
        thead.appendChild(filaEncabezado);
        tabla.appendChild(thead);

        // Crear filas de datos
        for (const item of datos) {
            const fila = document.createElement("tr");
            for (const encabezado of encabezados) {
                const td = document.createElement("td");
                td.textContent = item[encabezado];
                fila.appendChild(td);
            }
            tbody.appendChild(fila);
        }
        tabla.appendChild(tbody);
        contenedor.appendChild(tabla);
    }

    else if (modoSeleccionado === "list") {
        // Mostrar JSON como lista (recursiva)
        const listaGenerada = generarListaRecursiva(datos);
        contenedor.appendChild(listaGenerada);
    }

    else if (modoSeleccionado === "minified") {
        // Mostrar JSON plano sin saltos de línea
        const bloquePre = document.createElement("pre");
        bloquePre.textContent = JSON.stringify(datos);
        contenedor.appendChild(bloquePre);
    }

    else if (modoSeleccionado === "keys") {
        // Mostrar solo las claves principales
        const listaClaves = document.createElement("ul");

        if (Array.isArray(datos)) {
            // Si es array de objetos, mostrar claves del primer objeto
            if (datos.length > 0 && typeof datos[0] === "object" && datos[0] !== null) {
                for (const clave of Object.keys(datos[0])) {
                    const li = document.createElement("li");
                    li.textContent = clave;
                    listaClaves.appendChild(li);
                }
            } else {
                // Si no, mostrar índices
                for (let i = 0; i < datos.length; i++) {
                    const li = document.createElement("li");
                    li.textContent = `Índice ${i}`;
                    listaClaves.appendChild(li);
                }
            }
        }
        else if (typeof datos === "object" && datos !== null) {
            // Si es objeto, mostrar todas sus claves
            for (const clave in datos) {
                if (datos.hasOwnProperty(clave)) {
                    const li = document.createElement("li");
                    li.textContent = clave;
                    listaClaves.appendChild(li);
                }
            }
        } else {
            listaClaves.textContent = "El dato no tiene claves.";
        }
        contenedor.appendChild(listaClaves);
    }

    else if (modoSeleccionado === "values") {
        // Mostrar solo valores principales (sin claves)
        const listaValores = document.createElement("ul");

        if (Array.isArray(datos)) {
            for (const valor of datos) {
                const li = document.createElement("li");
                if (typeof valor === "object" && valor !== null) {
                    li.textContent = JSON.stringify(valor);
                } else {
                    li.textContent = valor;
                }
                listaValores.appendChild(li);
            }
        }
        else if (typeof datos === "object" && datos !== null) {
            for (const clave in datos) {
                if (datos.hasOwnProperty(clave)) {
                    const li = document.createElement("li");
                    if (typeof datos[clave] === "object" && datos[clave] !== null) {
                        li.textContent = JSON.stringify(datos[clave]);
                    } else {
                        li.textContent = datos[clave];
                    }
                    listaValores.appendChild(li);
                }
            }
        } else {
            listaValores.textContent = datos;
        }
        contenedor.appendChild(listaValores);
    }

    else if (modoSeleccionado === "colored") {
        // Mostrar JSON coloreado (simulación básica con spans y estilos)
        const bloquePre = document.createElement("pre");
        bloquePre.innerHTML = colorearJSON(datos);
        contenedor.appendChild(bloquePre);
    }
}

// Función recursiva que genera listas HTML desde un objeto o array JSON
function generarListaRecursiva(dato) {
    if (Array.isArray(dato)) {
        // Si es array, crear lista <ul>
        const ul = document.createElement("ul");
        for (const elemento of dato) {
            const li = document.createElement("li");
            if (typeof elemento === "object" && elemento !== null) {
                // Si el elemento es objeto o array, llamar recursivamente
                li.appendChild(generarListaRecursiva(elemento));
            } else {
                li.textContent = elemento;
            }
            ul.appendChild(li);
        }
        return ul;
    }
    else if (typeof dato === "object" && dato !== null) {
        // Si es objeto, crear lista <ul> con clave: valor
        const ul = document.createElement("ul");
        for (const clave in dato) {
            if (dato.hasOwnProperty(clave)) {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${clave}</strong>: `;
                if (typeof dato[clave] === "object" && dato[clave] !== null) {
                    li.appendChild(generarListaRecursiva(dato[clave]));
                } else {
                    li.innerHTML += dato[clave];
                }
                ul.appendChild(li);
            }
        }
        return ul;
    }
    else {
        // Si es dato simple, poner en un párrafo
        const p = document.createElement("p");
        p.textContent = dato;
        return p;
    }
}

// Función que devuelve el JSON con colores básicos para tipo (string, número, booleano, clave)
function colorearJSON(json) {
    // Convertir JSON a texto con indentación
    let jsonString = JSON.stringify(json, null, 2);

    // Escapar caracteres especiales HTML para evitar problemas
    jsonString = jsonString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Reemplazar claves y valores con spans de estilos
    jsonString = jsonString.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g, function (match) {
        let clase = 'string';
        if (/":$/.test(match)) {
            clase = 'key'; // clave JSON
        }
        return `<span class="${clase}">${match}</span>`;
    });
    jsonString = jsonString.replace(/\b(true|false|null)\b/g, '<span class="boolean">$1</span>');
    jsonString = jsonString.replace(/\b(-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)\b/g, '<span class="number">$1</span>');

    // Añadir estilos CSS básicos para colores
    return `
<style>
    .string { color: #d14; }
    .key { color: #1a1aa6; font-weight: bold; }
    .boolean { color: #099; font-weight: bold; }
    .number { color: #164; }
</style>
` + jsonString;
}
