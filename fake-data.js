const { fakerES_MX: faker } = require('@faker-js/faker')
const fs = require('fs')

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
    telefono: faker.phone.number('342######')
  }

  return empleado
}

const generateDataArray = (cantidad) => {
  const newArray = [];
  for (let i = 0; i < cantidad; i++) {
    newArray.push(empleado());
  }
  return newArray;
}

const storeDataArray = (empleados) => {
  const content = JSON.stringify(empleados, null, 2);
  fs.writeFile('empleados.json', content, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      return;
    }
    console.log('Los empleados se han guardado en empleados.json');
  });
}

const empleadosObj = generateDataArray(100)
storeDataArray(empleadosObj)

//module.exports = cliente
//module.exports = empleado