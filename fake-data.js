const { fakerES_MX: faker } = require('@faker-js/faker')

const cliente = () => {
  const nombre = faker.person.firstName()
  const apellido = faker.person.lastName().split(' ').slice(0,1)[0]

  return cliente = {
    nombre: nombre,
    apellido: apellido,
    direccion: faker.location.streetAddress(false),
    email: faker.internet.email({firstName: nombre, lastName: apellido, provider: 'gmail.com'}),
    cod_nivel_studio: faker.number.int({min: 1, max: 3}),
    sexo: faker.number.binary(),
    fecha_nacimiento: faker.date.birthdate({max: 50, mode: 'age'})
  }
}

const empleado = () => {
  return empleado = {
    nombre: faker.person.firstName(),
    apellido: faker.person.lastName().split(' ').slice(0,1)[0],
    direccion: faker.location.streetAddress(false),
    sueldo: faker.number.int({min: 600000, max: 1000000}),
    fecha_nacimiento: faker.date.birthdate({max: 50, mode: 'age'}),
    fecha_ingreso: faker.date.past({years: 5})
  }
}

module.exports = cliente
module.exports = empleado