const express = require("express")
const mysql = require("mysql2")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

const app = express()

app.get("/", (req, res)=>{
  res.send("hi")
})

app.get("/d", ()=>{
  var connection = mysql.createConnection({
    host     : 'srv-captain--pfmdausrgn-mysql-80x',
    user     : 'app3-user',
    password : 'EXwU39re4nD6',
    database: "app3-database"
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