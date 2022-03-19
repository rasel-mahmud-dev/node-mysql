const express = require("express")
const mysql = require("mysql2")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

const app = express()

app.get("/", (req, res)=>{
  res.send("hi change")
})

app.get("/d", (req, res)=>{
  var connection = mysql.createConnection({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
  });

  connection.connect((err)=>{
    if(err){
      res.send(err.message)
      return;
    }
    connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
        if (error){
          res.send("err");
          return
        }
        res.send(results[0].solution);
        // connection.end();
      });

  });

  // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  //   if (error){
  //     res.send(error.message.toString());
  //     return
  //   }
  //   res.send('The solution is: ', results[0].solution);
  //   connection.end();
  // });
  

})

app.listen(PORT, HOST)