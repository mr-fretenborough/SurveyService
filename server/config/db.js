const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "*S3cretP4ssword!*",
database:"dbSurveyService" 
})

module.exports = db;