const json = require('../data.json')
const input = require('../input.json')
const {filterValues, filterJSONValues} = require('./filter-data.js')

const fields = input.fields
const valuesArray = input.values

let newValues = {}

if(input.useFaker){
  newValues = filterValues({cant:input.amount, 
                            func:input.function, 
                            isDistributed: input.isDistributed,
                            output: input['json-file-name']
                          })
}else{
  if(input['json-to-input']){
    newValues = filterJSONValues(input['json-to-input'])
  }else{
    newValues = generateNewValues(fields, valuesArray, valuesArray.length)
  }
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