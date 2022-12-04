const mysql = require('mysql')
const db = mysql.createConnection({
host: "ubuntu@ec2-18-207-227-234.compute-1.amazonaws.com",
user: "root",
password: "*S3cretP4ssword!*",
database:"dbSurveyService" 
})

module.exports = db;