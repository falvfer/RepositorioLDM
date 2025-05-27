document.addEventListener("DOMContentLoaded", principal);

async function principal() {
    const respuesta = await fetch("ej4.estructura.yaml");
    const textoYAML = await respuesta.text();

    const datos = jsyaml.load(textoYAML); // Convertimos YAML a JSON
    mostrarNombresYCiudades(datos);
}

function mostrarNombresYCiudades(json) {
    const lista = document.getElementById("lista");

    // Suponemos que json es un array o contiene un array llamado "personas"
    const personas = Array.isArray(json) ? json : json.personas;

    for (let i = 0; i < personas.length; i++) {
        const persona = personas[i];
        const nombre = persona.nombre || "Desconocido";
        const ciudad = persona.ciudad || "Sin ciudad";

        const li = document.createElement("li");
        li.textContent = `Nombre: ${nombre}, Ciudad: ${ciudad}`;
        lista.appendChild(li);
    }
}