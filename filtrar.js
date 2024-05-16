const fs = require('fs')

const rutaJSON = 'clientes.json'
const fields = ['nombre', 'direccion'] //Por los campos que se quiere filtrar
const nameFile = 'clientes-filtrados.json' //Nombre que va a tener el nuevo json
const inicio = 4000 //Con 'inicio' y 'fin' establecemos el rango de elementos que queremos obtener
const fin = 4500

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
      storeDataArray(selectFields(objJson, fields))
    } catch (error) {
      console.error('Error en el parse del JSON', error)
    }
  })
}

function selectFields(obj, fields) {
  const sliceObj = obj.slice(inicio, fin)
  return sliceObj.map((item) => {
    const nuevoObjeto = {}
    fields.forEach((campo) => {
      if (item.hasOwnProperty(campo)) {
        nuevoObjeto[campo] = item[campo]
      }
    })
    return nuevoObjeto
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
