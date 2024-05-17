const { fakerES_MX: faker } = require('@faker-js/faker')
const fs = require('fs')
const multi = require('./multiplier')

const cliente = () => {
  const nombre = faker.person.firstName()
  const apellido = faker.person.lastName().split(' ').slice(0,1)[0]

  const cliente = {
    nombre: nombre,
    apellido: apellido,
    direccion: faker.location.streetAddress(false),
    email: faker.internet.email({firstName: nombre, lastName: apellido, provider: 'gmail.com'}),
    cod_nivel_studio: faker.number.int({min: 1, max: 3}),
    sexo: faker.number.binary(),
    fecha_nacimiento: faker.date.birthdate({max: 50, mode: 'age'})
  }

  return cliente
}

const empleado = () => {
  const ingreso = faker.date.past({years: 10})

  const empleado = {
    legajo: faker.number.int({min:20000, max: 90000}),
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName().split(' ').slice(0,1)[0],
    direccion: faker.location.streetAddress(false),
    sueldo: faker.number.int({min: 600000, max: 1000000}),
    fecha_nacimiento: faker.date.birthdate({max: 50, mode: 'age'}),
    fecha_ingreso: ingreso,
    fecha_egreso: faker.date.between({from: ingreso, to:''}),
    //telefono: faker.phone.number('342######')
    telefono: parseInt(faker.helpers.fromRegExp(/342[0-9]{6}/))
  }

  return empleado
}

const venta = () => {
  const venta = {
    nro_ticket: faker.number.int({min: 10000, max: 100000}),
    fecha: faker.date.recent(),
    cod_empleado: '',
    cod_cliente: '',
    monto: ''
  }

  return venta
}

const generateDataArray = (cantidad, func) => {
  const newArray = [];
  for (let i = 0; i < cantidad; i++) {
    newArray.push(eval(func)());
  }
  return newArray;
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

//storeDataArray(generateDataArray(2, input.function), input['json-file-name'])

function getDistributedValues({cant, years, func}){
  let newArray = []
  for(let i = 0; i<years; i++){
    for(let j = 1; j<13; j++){
      const dataArray = generateDataArray(cant * multi(j), func)
      newArray = newArray.concat(dataArray)
    }
  }
  return newArray
}

module.exports = {
  generateDataArray,
  getDistributedValues,
  storeDataArray
}