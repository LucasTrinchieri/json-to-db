const json = require('./data.json')
const input = require('./input.json')

const fields = input.fieds
const valuesArray = input.values

function generateObj(fields, valores) {
  if (fields.length !== valores.length) {
    throw new Error('La longitud de los campos y los valores no coincide');
  }

  const obj = {};

  for (let i = 0; i < fields.length; i++) {
    obj[fields[i]] = valores[i];
  }

  return obj;
}

function generateNewValues(fields, valoresArray, cantidad){
  let newValues = []
  
  for (let i = 0; i < cantidad; i++){
    const newObj = generateObj(fields, valoresArray[i])
    newValues[i] = newObj
  }

  return newValues
}

const newValues = generateNewValues(fields, valuesArray, valuesArray.length)

json.insert.table = input.table
json.insert.values = newValues

module.exports = data = {
  ...json
}