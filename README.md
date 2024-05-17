## Cómo usarlo:

1. Abrir el archivo input.json.
2. En el campo "table", ingresar el nombre de la tabla donde se desean colocar los valores.
3. En el campo "fields", dentro de un array en formato de "strings", colocar los nombres de los campos de la tabla.
4. En el campo "values", array de arrays, colocar los valores que tendrán cada uno de los campos.
5. Debajo de "values" viene todo lo relacionado a "faker.js".
   1. "use faker" = true si queres usar faker.
   2. "isDistributed" = true si queres que los datos tengan una distribucion estadistica (de anda a saber que forma) en cuanto a la cantidad
   3. "years" se usa solo si usas isDistributed, se pone la cantidad de años de datos que queres cargar
   4. "function" es un string con el nombre de la funcion que hayamos armado en `fake-data.js`, sin el ()
   5. "amount" es la cantidad de datos que queremos generar. Si usamos "isDistributed", sera la cantidad base de datos que se cargaran por mes

Para configurar la conexión a la base de datos, se debe modificar el archivo config.js.<br>
Para ejecutar el script, se necesita Node. Y se ejecuta con el comando `node script.js`

### Importante
La conexion a la Base de Datos la realiza utilizando usuario y contraseña, como tambien el puerto en el corre su SQLSERVER.<br>
#### Puerto
Para saber en que puerto estan, van a SQL Server Configuration Manager, entran a Protocols... y en TCP/IP si esta Disable, le hacen doble click y donde dice Enable le ponen "yes" <br>
![image](https://github.com/LucasTrinchieri/json-to-db/assets/102260737/1b587f27-d675-4b95-a9f7-2654fe56b870) <br>

Despues van a la pestaña de IP Adresses en esa misma ventana, bajan abajo de todo hasta donde dice IPAII, y el numero en el puerto dinamico sera el puerto para conectarse <br>
![image](https://github.com/LucasTrinchieri/json-to-db/assets/102260737/b4c81889-8704-4668-8817-13ed7af611cb) <br>

Por ultimo tienen que reinciar el servicio de SQL en Servicios, se llama SQLSERVER, y listo <br>

#### Usuario y Contraseña
Para crear un usuario en el servidor, dentro del SQLServer Management Studio, van a Security > Logins y crean un new Login marcando que quieren logearse con contraseña (SQL Server Authentication)<br>
![image](https://github.com/LucasTrinchieri/json-to-db/assets/102260737/9911c8b4-caef-496a-ae83-29dc54b44e34) <br>

Colocan el nombre del usuario y la contreseña, y en la pestaña de Server Roles, le tildan el rol de sysadmin. Y por ultimo hacen click derecho > Propiedades en su instancia de la Base de Datos y en Security le dan click a esta opcion <br>
![image](https://github.com/LucasTrinchieri/json-to-db/assets/102260737/52b8e9b5-bfff-469c-b8db-918f1484038f) <br>

Click derecho sobre la instancia > Reinciar y ya estaria todo
