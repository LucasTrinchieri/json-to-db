const { generateDataArray, getDistributedValues, storeDataArray } = require('./fake-data')
const input = require('../input.json')
const fs = require('fs')

const fields = input.fields
const JSONDIR = '../jsons/'
const json_to_input = input['json-to-input']
const output = '../jsons/'+input['json-file-name']
const slice = false
const inicio = 4000 //Con 'inicio' y 'fin' establecemos el rango de elementos que queremos obtener
const fin = 4500

async function readJsonFile(file, fields){
  try {
    const data = await fs.readFile(file, {encoding: 'utf8'});
  
    if (!data) {
      console.error(`El archivo '${file}' está vacío.`);
      return
    }
    const objJson = JSON.parse(data)
    const newObj = selectFields(objJson, fields)
    return newObj
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(`El archivo '${file}' no fue encontrado.`);
    } else {
      console.error('Error al leer el archivo:', error);
    }
    return
  }
}

function selectFields(obj, fields) {
  const Obj = slice ? obj.slice(inicio, fin) : obj
  return Obj.map((item) => {
    const nuevoObjeto = {}
    fields.forEach((campo) => {
      if (item.hasOwnProperty(campo)) {
        nuevoObjeto[campo] = item[campo]
      }
    })
    return nuevoObjeto
  })
}

async function filterValues({cant, func, isDistributed}){
  if(json_to_input){
    const path = JSONDIR + json_to_input
    const filteredData = await readJsonFile(path, fields)
    return filteredData
  }

  let dataArray = []
  if(isDistributed){
    dataArray = getDistributedValues({cant:cant, years:input.years, func:func})
  }else{
    dataArray = generateDataArray(cant, func)
  }

  if(output){
    storeDataArray(dataArray, output)
    return
  }
  const filteredData = selectFields(dataArray, fields)

  return filteredData
}

module.exports = { filterValues }
