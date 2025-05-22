// Simulación de un archivo JSON (como si viniera de un archivo o API)
const datosJSON = [
  { "nombre": "Ana", "edad": 25, "ciudad": "Madrid" },
  { "nombre": "Luis", "edad": 30, "ciudad": "Barcelona" },
  { "nombre": "Carla", "edad": 28, "ciudad": "Sevilla" }
];

function crearTabla(datos) {
  // Crear tabla y encabezado
  const tabla = document.createElement('table');
  tabla.border = '1';

  const encabezado = tabla.insertRow();
  const claves = Object.keys(datos[0]); // ["nombre", "edad", "ciudad"]
  for (let clave of claves) {
    const th = document.createElement('th');
    th.textContent = clave.charAt(0).toUpperCase() + clave.slice(1); // Capitaliza
    encabezado.appendChild(th);
  }

  // Agregar filas de datos
  for (let fila of datos) {
    const tr = tabla.insertRow();
    for (let clave of claves) {
      const td = tr.insertCell();
      td.textContent = fila[clave];
    }
  }

  // Insertar la tabla en el contenedor del HTML
  document.getElementById('tabla-container').appendChild(tabla);
}

// Llamamos a la función con los datos
crearTabla(datosJSON);
