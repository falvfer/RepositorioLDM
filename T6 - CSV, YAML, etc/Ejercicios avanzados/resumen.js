document.addEventListener("DOMContentLoaded", main);

async function main() {
    ejercicio1_JSON_XML();
    ejercicio2_CSV_JSON_HTML();
    ejercicio3_Markdown_HTML();
    ejercicio4_YAML_JSON();
    ejercicio5_Validacion_CSV();
    ejercicio6_Analisis_JSON();
}

// =====================
// Datos simulados
// =====================

const ej1_json = {
    curso: {
        nombre: "Lenguajes de marcas",
        alumnos: [
            { nombre: "Ana", edad: 20 },
            { nombre: "Luis", edad: 22 }
        ]
    }
};

const ej1_xml = `
<curso>
    <nombre>Lenguajes de marcas</nombre>
    <alumnos>
        <nombre>Ana</nombre>
        <edad>20</edad>
        <nombre>Luis</nombre>
        <edad>22</edad>
    </alumnos>
</curso>
`;

const ej2_csv = `
nombre,edad
Ana,30
Luis,27
`;

const ej3_md = `
# Título del informe

## Introducción

Este es un informe en formato **Markdown**.

- Punto uno
- Punto dos
`;

const ej4_yaml = `
personas:
  - nombre: Ana
    ciudad: Sevilla
  - nombre: Luis
    ciudad: Córdoba
`;

const ej5_csv = `
nombre,edad,email
Lucía,,lucia@email.com
,Hugo,30
María,27,
`;

const ej6_json = [
    { nombre: "Ana", curso: "SMR", nota: 8.5, email: "ana@email.com" },
    { nombre: "Luis", curso: "DAW", nota: 6.2, email: "luis@email.com" },
    { nombre: "Laura", curso: "DAW", nota: 9.1, email: "laura@email.com" },
    { nombre: "Carlos", curso: "DAM", nota: 4.9, email: "carlos@email.com" }
];

// =====================
// Ejercicio 1: JSON ↔ XML
// =====================

function ejercicio1_JSON_XML() {
    console.log("Ejercicio 1 – JSON a XML:");
    const xml = jsonToXml(ej1_json);
    console.log(xml);

    console.log("Ejercicio 1 – XML a JSON:");
    const dom = new DOMParser().parseFromString(ej1_xml, "application/xml");
    const json = xmlToJson(dom.documentElement);
    console.log(JSON.stringify(json, null, 2));
}

function jsonToXml(obj, nodeName = "") {
    let xml = "";
    if (Array.isArray(obj)) {
        for (let item of obj) xml += jsonToXml(item, nodeName);
    } else if (typeof obj === "object") {
        for (let key in obj) xml += `<${key}>${jsonToXml(obj[key], key)}</${key}>`;
    } else {
        xml += obj;
    }
    return xml;
}

function xmlToJson(xml) {
    const obj = {};
    for (let node of xml.children) {
        const key = node.nodeName;
        const value = node.children.length > 0 ? xmlToJson(node) : node.textContent.trim();
        if (obj[key]) {
            if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
            obj[key].push(value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
}

// =====================
// Ejercicio 2: CSV → JSON → HTML
// =====================

function ejercicio2_CSV_JSON_HTML() {
    console.log("Ejercicio 2 – CSV a JSON y tabla HTML:");
    const datos = csvToJson(ej2_csv);
    console.table(datos);
}

function csvToJson(csv) {
    const lines = csv.trim().split("\n");
    const headers = lines[0].split(",");
    const rows = [];

    for (let i = 1; i < lines.length; i++) {
        const fila = lines[i].split(",");
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            const valor = fila[j] ? fila[j].trim() : "";
            obj[headers[j]] = isNaN(valor) ? valor : Number(valor);
        }
        rows.push(obj);
    }

    return rows;
}

// =====================
// Ejercicio 3: Markdown a HTML
// =====================

function ejercicio3_Markdown_HTML() {
    console.log("Ejercicio 3 – Markdown a HTML:");
    const html = marked.parse(ej3_md);
    console.log(html);
}

// =====================
// Ejercicio 4: YAML → JSON → selección de campos
// =====================

function ejercicio4_YAML_JSON() {
    const json = jsyaml.load(ej4_yaml);
    const personas = json.personas;
    console.log("Ejercicio 4 – Nombres y ciudades:");
    for (let i = 0; i < personas.length; i++) {
        console.log(`Nombre: ${personas[i].nombre}, Ciudad: ${personas[i].ciudad}`);
    }
}

// =====================
// Ejercicio 5: Validación de CSV → JSON
// =====================

function ejercicio5_Validacion_CSV() {
    const alumnos = csvToJson(ej5_csv);
    console.log("Ejercicio 5 – Validación:");

    for (let i = 0; i < alumnos.length; i++) {
        const a = alumnos[i];
        const errores = [];
        if (!a.nombre) errores.push("nombre");
        if (!a.edad || isNaN(a.edad)) errores.push("edad");

        if (errores.length) {
            console.warn(`Fila ${i + 2}: Falta ${errores.join(" y ")}`);
        } else {
            console.log(`✔️ ${a.nombre}, Edad: ${a.edad}`);
        }
    }
}

// =====================
// Ejercicio 6: Análisis con JS (en lugar de jq)
// =====================

function ejercicio6_Analisis_JSON() {
    console.log("Ejercicio 6 – Nombres:");
    ej6_json.forEach(a => console.log(a.nombre));

    console.log("Ejercicio 6 – Alumnos de DAW:");
    ej6_json.filter(a => a.curso === "DAW").forEach(a => console.log(`${a.nombre} (${a.nota})`));

    console.log("Ejercicio 6 – Notas > 7:");
    ej6_json.filter(a => a.nota > 7).forEach(a => console.log(`${a.nombre}: ${a.nota}`));

    console.log("Ejercicio 6 – CSV (nombre,nota):");
    const csv = ej6_json.map(a => `"${a.nombre}",${a.nota}`).join("\n");
    console.log(csv);
}
