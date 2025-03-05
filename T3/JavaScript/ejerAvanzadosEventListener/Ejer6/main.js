function cargarDOM() {
    noticias = document.getElementById("noticias");
    formulario = document.getElementById("formulario");
    contador = 1;
    partesNoticia = [];
    noticiaTxt = [];
    partesNoticia.push("titulo", "lugar", "fecha", "categoria", "descripcion");
    noticiaTxt.push("Título", "Lugar", "Fecha", "Categoría", "Descripción");
}

function addNoticia(e) {
    e.preventDefault();
    noticia = document.createElement("div");
    noticia.setAttribute("id", "noticia" + contador);

    for (let i = 0; i < partesNoticia.length; i++)
        noticia.innerHTML += "<p><strong>" + noticiaTxt[i] + ":</strong> "
                                + "<span id=\""+partesNoticia[i]+contador+"\">"
                                    + document.getElementById(partesNoticia[i]).value + "</span> </p>";

    botones = "<div class=\"row g-0\">"
            +   "<div class=\"col\">"
            +       "<input type=\"button\" value=\"Editar\" onclick=\"editar("+contador+")\">"
            +   "</div>"
            +   "<div class=\"col\">"
            +       "<input type=\"button\" value=\"Eliminar\" onclick=\"eliminar("+contador+")\">"
            +   "</div>"
            + "</div>"
    contador++;

    noticia.innerHTML += botones;
    noticias.insertBefore(noticia, noticias.firstChild);
    formulario.reset();
}

function editar(num) {
    for (let i = 0; i < partesNoticia.length; i++)
        document.getElementById(partesNoticia[i]).value = document.getElementById(partesNoticia[i]+num).textContent;
    eliminar(num);
}

function eliminar(num) {
    noticias.removeChild(document.getElementById("noticia"+num));
}