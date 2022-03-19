const express = require("express")
const mysql = require("mysql2")

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST

require("dotenv").config()

const app = express()

app.get("/", (req, res)=>{
  res.send("hi change")
})

app.get("/d", async (req, res)=>{
  try{
  var pool = mysql.createPool({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USERNAME,
    password : process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
  });

  const promisePool = pool.promise();
  // query database using promises
  const [rows, result] = await promisePool.query('SELECT 100 + 1 AS solution');
    res.send(rows);
  } catch(ex){
    res.send(ex.message)
  }

});

  // connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  //   if (error){
  //     res.send(error.message.toString());
  //     return
  //   }
  //   res.send('The solution is: ', results[0].solution);
  //   connection.end();
  // });
  


app.listen(PORT, HOST)