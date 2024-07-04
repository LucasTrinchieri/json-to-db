const sqlConector = require('mssql')
var jsonSql = new (require('json-sql').Builder)({ separatedValues: false })
const data = require('../utils/generate-json.js')

const config = require('../config.json')

const chunkArray = (array, chunkSize) => {
  let result = []
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize))
  }
  return result
}

const chunkedValues = chunkArray(data.insert.values, 1000)

async function sqlScript() {
  try {
    let pool = await sqlConector.connect(config)
    console.log('Conectado a la BD')
    for (const chunk of chunkedValues) {
      const chunkQuery = jsonSql.build({
        dialect: data.insert.dialect,
        type: data.insert.type,
        table: data.insert.table,
        values: chunk,
      }).query

      const response = await pool.request().query(chunkQuery)
      console.log('Respuesta: ', response)
    }
  } catch (e) {
    console.error('Error al ejecutar la consulta', e)
  } finally {
    sqlConector.close()
    console.log('Conexion cerrada')
  }
}

sqlScript()
