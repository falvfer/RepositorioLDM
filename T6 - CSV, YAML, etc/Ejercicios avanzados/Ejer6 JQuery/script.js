document.addEventListener("DOMContentLoaded", principal);

async function principal() {
    const respuesta = await fetch("ej6_alumnos.json");
    const alumnos = await respuesta.json();

    mostrarNombres(alumnos);
    mostrarDAW(alumnos);
    mostrarNotasAltas(alumnos);
    generarCSV(alumnos);
}

function mostrarNombres(alumnos) {
    const ul = document.getElementById("nombres");
    for (let i = 0; i < alumnos.length; i++) {
        const li = document.createElement("li");
        li.textContent = alumnos[i].nombre;
        ul.appendChild(li);
    }
}

function mostrarDAW(alumnos) {
    const ul = document.getElementById("daw");
    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].curso === "DAW") {
            const li = document.createElement("li");
            li.textContent = `${alumnos[i].nombre} (${alumnos[i].nota})`;
            ul.appendChild(li);
        }
    }
}

function mostrarNotasAltas(alumnos) {
    const ul = document.getElementById("notables");
    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].nota > 7) {
            const li = document.createElement("li");
            li.textContent = `${alumnos[i].nombre}: ${alumnos[i].nota}`;
            ul.appendChild(li);
        }
    }
}

function generarCSV(alumnos) {
    const csvLines = alumnos.map(a => `"${a.nombre}",${a.nota}`);
    document.getElementById("csv").textContent = csvLines.join("\n");
}