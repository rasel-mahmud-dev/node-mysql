const express = require("express")
const mysql = require("mysql2")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

const app = express()

app.get("/", ()=>{
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345'
  });
  
  connection.connect();
  
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
  
  connection.end();

})

app.listen(PORT, HOST)