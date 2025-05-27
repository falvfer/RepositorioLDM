document.addEventListener("DOMContentLoaded",principal);
async function principal(){

    const jsonText = await fetch("ej1_curso.json").then(r => r.text());
    const xmlText = await fetch("ej1_curso.xml").then(r => r.text());

    const jsonObj = JSON.parse(jsonText);
    const xmlDOM = new DOMParser().parseFromString(xmlText, "application/xml");

    const xmlGenerado = jsonToXml(jsonObj);
    const jsonGenerado = xmlToJson(xmlDOM);

    // Mostrar resultados en pantalla
    document.getElementById("xml").textContent = xmlGenerado;
    document.getElementById("json").textContent = JSON.stringify(jsonGenerado, null, 2);

}

function jsonToXml(obj, nodeName = "") {
    let xml = "";

    if (typeof obj === "object" && !Array.isArray(obj)) {
        if (nodeName!="")
            xml += `<${nodeName}>`;
        for (let key in obj) {
            xml += jsonToXml(obj[key], key);
        }
        if (nodeName!="")
            xml += `</${nodeName}>`;
    } else if (Array.isArray(obj)) {
        for (let item of obj) {
            xml += jsonToXml(item, nodeName);
        }
    } else {
        xml += `<${nodeName}>${obj}</${nodeName}>`;
    }

    return xml;
}

function xmlToJson(xml) {
    const obj = {};

    if (xml.nodeType === 1 && xml.childNodes.length === 1 && xml.firstChild.nodeType === 3) {
        return xml.firstChild.nodeValue.trim();
    }

    for (let node of xml.children) {
        const key = node.nodeName;
        const value = xmlToJson(node);

        if (obj[key] === undefined) {
            obj[key] = value;
        } else {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]];
            }
            obj[key].push(value);
        }
    }

    return obj;
}