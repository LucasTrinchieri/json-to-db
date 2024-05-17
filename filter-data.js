const { da } = require('@faker-js/faker')
const { generateDataArray, getDistributedValues } = require('./fake-data')
const input = require('./input.json')

const fields = input.fields
const slice = false
const inicio = 4000 //Con 'inicio' y 'fin' establecemos el rango de elementos que queremos obtener
const fin = 4500

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

function filterValues({cant, func, isDistributed}){
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
