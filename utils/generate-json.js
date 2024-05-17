const json = require('../data.json')
const input = require('../input.json')
const {filterValues} = require('./filter-data.js')

const fields = input.fields
const valuesArray = input.values

let newValues = {}

if(input.useFaker){
  if(input.isDistributed){
    newValues = filterValues({cant:input.amount, func:input.function, isDistributed: input.isDistributed})
  }else{
    newValues = filterValues({cant:input.amount, func:input.function})
  }
}else{
  newValues = generateNewValues(fields, valuesArray, valuesArray.length)
}


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

json.insert.values = newValues
json.insert.table = input.table

module.exports = data = {
  ...json
}