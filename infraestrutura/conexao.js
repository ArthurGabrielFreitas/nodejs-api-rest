const mysql = require('mysql2')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ebc2021!!',
    database: 'agenda_petshop',
    insecureAuth : true
})

module.exports = conexao