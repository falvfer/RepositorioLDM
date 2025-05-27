document.addEventListener("DOMContentLoaded", principal);

async function principal() {
    const respuesta = await fetch("ej3_informe.md");
    const markdown = await respuesta.text();

    const html = marked.parse(markdown);  // Convertir Markdown a HTML
    const contenedor = document.getElementById("contenido");
    contenedor.innerHTML = html; // Mostrar HTML generado
}