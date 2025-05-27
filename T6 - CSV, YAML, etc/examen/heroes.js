document.addEventListener("DOMContentLoaded",principal);
    async function principal(){

        // Cargar el primer header y section del html para poner los elementos.
        const header = document.querySelector("header");
        const section = document.querySelector("section");

        // Cargar el archivo json.
        const archivoJson = await fetch("./superheroes.json");
        const superHeroes = await archivoJson.json();

        // Llamar a las funciones
        rellenaHeader(superHeroes);
        muestraHeroes(superHeroes);

        /**
         *  Función que rellena el header desde la información del objeto obtenido del JSON.
         */ 
        function rellenaHeader(jsonObj) {
            const miH1 = document.createElement("h1"); 
            miH1.textContent = jsonObj["nombreEscuadron"];
            header.appendChild(miH1);
            const miParra = document.createElement("p");
            miParra.textContent = "Ciudad Origen: " + jsonObj["ciudadOrigen"] +
                                " // Fundación: " + jsonObj["fundacion"];
            header.appendChild(miParra);
        }

        /**
         *  Función que crea tarjetas por cada superhéroe
         */
        function muestraHeroes(jsonObj) {
            // Array con todos los miembros del equipo
            const heroes = jsonObj["miembros"]; 

            for (var i = 0; i < heroes.length; i++) { // Por cada miembro del equipo
                // Crear los elementos HTML
                const articulo = document.createElement("article");
                const h2Nombre = document.createElement("h2"); 
                const pIdentidad = document.createElement("p");
                const pEdad = document.createElement("p");
                const pSuperheroes = document.createElement("p");
                const listaPoderes = document.createElement("ul");
                
                // Añadimos el contenido correspondiente a cada elemento HTML
                h2Nombre.textContent = heroes[i].nombre;
                pIdentidad.textContent = "Identidad Secreta: " + heroes[i].identidadSecreta;
                pEdad.textContent = "Edad: " + heroes[i].edad;
                pSuperheroes.textContent = "Superpoderes:";

                const superPoderes = heroes[i].poderes; 
                for (var j = 0; j < superPoderes.length; j++) { 
                    const item = document.createElement("li"); 
                    item.textContent = superPoderes[j];
                    listaPoderes.appendChild(item);
                }

                // Añadimos los datos al artículo del superheroe.
                articulo.appendChild(h2Nombre);
                articulo.appendChild(pIdentidad);
                articulo.appendChild(pEdad);
                articulo.appendChild(pSuperheroes);
                articulo.appendChild(listaPoderes);

                // Añadimos el artículo del superheroe al section
                section.appendChild(articulo); 
            }
        }
}