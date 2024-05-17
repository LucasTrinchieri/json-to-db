const { generateDataArray, getDistributedValues } = require('./fake-data')
const input = require('../input.json')

const fields = input.fields
const jsonDir = '../jsons/'+input.json
const slice = false
const inicio = 4000 //Con 'inicio' y 'fin' establecemos el rango de elementos que queremos obtener
const fin = 4500

async function readJsonFile(file, fields){
  try {
    const data = await fs.readFile(file, 'utf8');
  
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
  if(jsonDir){
    const filteredData = await readJsonFile(jsonDir, fields)
    return filteredData
  }

  let dataArray = []
  if(isDistributed){
    dataArray = getDistributedValues({cant:cant, years:input.years, func:func})
  }else{
    dataArray = generateDataArray(cant, func)
  }
  const filteredData = selectFields(dataArray, fields)

  return filteredData
}

module.exports = { filterValues }
