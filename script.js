const sqlConector = require('mssql')
var jsonSql = new (require('json-sql').Builder)({separatedValues: false})
const data = require('./generate-json.js')

const config = {
  server: 'localhost',
  authentication: {
    type: 'default',
    options: {
      userName: 'rrhh',
      password: 'rrhh123'
    }
  },
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    database: 'RRHH'
  },
  port: 54435,
}

var sql = jsonSql.build({
  dialect: data.insert.dialect,  
  type: data.insert.type,
  table: data.insert.table,
  values: data.insert.values,
})

async function sqlScript(query) {
  try{
    let pool = await sqlConector.connect(config);
    console.log('Conectado a la BD')
    console.log('Query generada: ', query)
    const response = await pool.request().query(query)
    console.log('Respuesta: ', response)
  } catch (e){
    console.error('Error al ejecutar la consulta', e)
  } finally{
    sqlConector.close()
    console.log('Conexion cerrada')
  }
}

sqlScript(sql.query)