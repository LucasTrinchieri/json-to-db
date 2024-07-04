const { fakerES_MX: faker, da } = require('@faker-js/faker')
const fs = require('fs')
const multi = require('./multiplier')

function readJsonFile(file, fields){
  try {
    const data = fs.readFileSync(file, {encoding: 'utf8'});

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
  const Obj = obj
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

const rangeArray = Array.from({length: 11000 - 5501 + 1}, (v, i) => i + 5501);
// const rangeArray = [5501];

const asistencia = (codigo, year, month, week, array) => {
  const calulatedYear = 2024 - year
  const startDate = new Date(calulatedYear, month - 1, (week - 1) * 7 + 1)
  const endDate = new Date(calulatedYear, month - 1, week * 7)
  let fecha = faker.date.between({from:startDate, to:endDate})
  fecha = fecha.toISOString().split('T')[0]
  while(array.includes(fecha)){
    fecha = faker.date.between({from:startDate, to:endDate})
    fecha = fecha.toISOString().split('T')[0]
  }

  array.push(fecha)

  const asistencia = {
    cod_cliente : codigo,
    fecha : fecha,
  }

  return asistencia
}

// const generateDataArray = (cantidad, func, codigo, year, month, week, arrayAsistenciaCliente) => {
//   const newArray = [];
//   for (let i = 0; i < cantidad; i++) {
//     newArray.push(eval(func)(codigo, year, month, week, arrayAsistenciaCliente));
//   }
//   return newArray;
// }

const generateDataArray = (cantidad, func, codigo, year, month, week, arrayAsistenciaCliente) => {
  const newArray = [];
  for (let i = 0; i < cantidad; i++) {
    newArray.push(eval(func)(codigo, year, month, week, arrayAsistenciaCliente));
  }
  return newArray;
}

const addValuesToObject = (originaldData, func) => {
  const newData = originaldData.map(o => eval(func)(o))
  return newData
}

const addValuesToJson = (originaldData, func, amount) => {
  let newData = originaldData
  for(let i=0; i<amount; i++){
    const data = eval(func)()
    newData.push(data)
  }
  return newData
}

const storeDataArray = (array, fileName) => {
  const content = JSON.stringify(array, null, 2);
  fs.writeFile(`./jsons/${fileName}.json`, content, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err)
      return;
    }
    console.log(`Los datos se han guardado en ${fileName}.json`)
  });
}

// function getDistributedValues({cant, years, func}){
//   let newArray = []
//   for(let i = 0; i<years; i++){
//     for(let j = 1; j<13; j++){
//       const dataArray = generateDataArray(cant * multi(j), func, i, j)
//       newArray = newArray.concat(dataArray)
//     }
//   }
//   return newArray
// }

function getDistributedValues({cant, years, func}) {
  let newArray = [];
  for (let codigo of rangeArray) {
    console.log("cliente: ", codigo)
    let arrayAsistenciaCliente = []
    for (let year = 0; year < years; year++) {
      for (let month = 1; month <= 12; month++) {
        for (let week = 1; week <= 4; week++) {
          const numAsistencias = faker.number.int({min: 1, max: 3});
          for (let i = 0; i < numAsistencias; i++) {
            newArray.push(eval(func)(codigo, year, month, week, arrayAsistenciaCliente))
            // const dataArray = generateDataArray(1, func, codigo, year, month, week, arrayAsistenciaCliente)
            // newArray.push(dataArray)
          }
        }
      }
    }
  }
  return newArray;
}

module.exports = {
  generateDataArray,
  getDistributedValues,
  storeDataArray,
  addValuesToJson,
  addValuesToObject
}