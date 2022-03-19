const express = require("express")
const mysql = require("mysql2")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

const app = express()

app.get("/", (req, res)=>{
  res.send("hi change")
})

app.get("/d", ()=>{
  var connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });
  
  connection.connect();
  
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error){
      res.send('The solution is: ', error.message);
      return
    }
    res.send('The solution is: ', results[0].solution);
  });
  
  connection.end();

})

app.listen(PORT, HOST)