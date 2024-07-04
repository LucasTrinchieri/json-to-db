const dir = "C:\\Users\\lucas\\OneDrive\\Documentos\\Repos\\slqserver-script\\jsons\\productos\\productos-complete.json"
const productos = readJsonFile(dir, ["costo"])

let allTicketsNumbers = []

const venta = (year, month) => {
  const item_venta_array = []
  let nro_ticket = faker.number.int({min: 100000, max: 1000000})
  while(allTicketsNumbers.includes(nro_ticket)){
    nro_ticket = faker.number.int({min: 100000, max: 1000000})
  }
  allTicketsNumbers.push(nro_ticket)
  const amount = faker.number.int({min:1, max:3})
  let total = 0
  let prodArray = []
  for (let i = 0; i < amount; i++) {
    const item = item_venta(nro_ticket, prodArray)
    prodArray.push(item.cod_producto)

    item_venta_array.push(item)
    total += item.monto_item
  }

  const calulatedYear = 2024-(year)
  const fecha = faker.date.recent({refDate:`${calulatedYear}-${month}-01`, days:30})

  const venta = {
    nro_ticket: nro_ticket,
    fecha: fecha,
    cod_empleado: faker.number.int({min:1, max:100}),
    cod_cliente: faker.number.int({min:5501, max:11000}),
    monto: total,
    item_venta: item_venta_array
  }

  return venta
}

const item_venta = (nro_ticket, array) => {
  let prod = faker.helpers.arrayElement(productos)
  let indice_prod = productos.findIndex(producto => producto === prod)
  while(array.includes(indice_prod + 2)){
    prod = faker.helpers.arrayElement(productos)
    indice_prod = productos.findIndex(producto => producto === prod)
  }
  const item = {
    nro_ticket: nro_ticket,
    cod_producto: indice_prod + 2,
    cantidad: faker.number.int({min:1, max:3}),
    monto_item: prod.costo
  }

  return item
}

const producto = (o, familia, cod) => {
  const productoCompleto = {
    descripcion_producto: o.descripcion_producto,
    costo: faker.number.int({min:10000, max:15000}),
    cod_tipo_producto: parseInt(cod),
    cod_familia: parseInt(familia)
  }

  return productoCompleto
}

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
    telefono: parseInt(faker.helpers.fromRegExp(/342[0-9]{6}/))
  }

  return empleado
}

const empleados_especialidad_actividad = (o) => {
  const hora_inicio = faker.date.between({from: '2020-01-01T08:00:00.000Z', to:'2020-01-02T18:00:00.000Z'})
  function agregarInformacion(legajo) {
    const nuevaInformacion = {
     id_actividad: faker.number.int({ min: 1, max: 10 }),
     hora_inicio: hora_inicio,
     hora_fin: faker.date.between({ from: hora_inicio, to:'2020-01-02T22:00:00.000Z'}),
     cod_especialidad: faker.number.int({ min: 101, max: 109 }),
     nivel_conocimiento: faker.number.int({ min: 60, max: 95 })
    }

    const newData = { legajo, ...nuevaInformacion }
    return newData
  }

  const data = agregarInformacion(o.legajo)
  return data
}