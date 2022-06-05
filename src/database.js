const mysql = require("mysql");

//Create connection to MySQL Server
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root", // User for yout SQL Server
  password: "1402", //Pasword for your SQL Server
  database: "db_nutrition",
});

mysqlConnection.connect(function(err){
    if(!err){
        console.log('Conection to database succes!')
    }else{
        console.log('Sorry, we have some problems to conect your DB')
        console.log(err)
    }
})

module.exports = mysqlConnection; //Export module for use into other files