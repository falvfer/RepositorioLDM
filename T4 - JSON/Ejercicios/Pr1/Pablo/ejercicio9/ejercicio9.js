const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);

const schema = require("./plantilla.json");

const dataValida = {
  fechas: {
    fechaInicio: "2025-04-22",
    fechaFin: "2025-04-23"
  }
};

const dataInvalida = {
  fechas: {
    fechaInicio: "2025-04-25",
    fechaFin: "2025-04-23"
  }
};

const validate = ajv.compile(schema);

console.log("Probando datos válidos:");
console.log(validate(dataValida)); // true
if (!validate(dataValida)) console.log(validate.errors);

console.log("\nProbando datos inválidos:");
console.log(validate(dataInvalida)); // false
if (!validate(dataInvalida)) console.log(validate.errors);
