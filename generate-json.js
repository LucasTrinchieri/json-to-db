const json = require('./data.json')
const input = require('./input.json')
const getRandomValues = require('./randomizer.js')

const fields = input.fields
const valuesArray = input.values.length > 0 ? input.values : getRandomValues(input.consts.values, input.consts.iter)

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

json.insert.values = newValues
json.insert.table = input.table

module.exports = data = {
  ...json
}