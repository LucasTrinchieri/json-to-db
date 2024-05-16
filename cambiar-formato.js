const fs = require('fs')

const rutaJSON = 'clientes-filtrados.json'
const nameFile = 'clientes-filtrados.txt' //Nombre que va a tener el nuevo json

function leerFile() {
  fs.readFile(rutaJSON, 'utf8', (error, data) => {
    if (error) {
      if (error.code === 'ENOENT') {
        console.error(`El archivo '${rutaArchivo}' no fue encontrado.`)
      } else {
        console.error('Error al leer el archivo:', error)
      }
      return
    }
    if (!data) {
      console.error(`El archivo '${rutaArchivo}' está vacío.`)
      return
    }

    try {
      const objJson = JSON.parse(data)

      const nuevoFormato = objJson.map((obj, index) => [
        index + 2001,
        obj.nombre,
        obj.direccion,
      ])

      storeDataArray(nuevoFormato)
    } catch (error) {
      console.error('Error en el parse del JSON', error)
    }
  })
}

function storeDataArray(empleados) {
  const content = JSON.stringify(empleados, null, 2)

  fs.writeFile(nameFile, content, (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err)
      return
    }
    console.log(`Los empleados se han guardado en ${nameFile}`)
  })
}

leerFile()
