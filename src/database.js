const mysql = require("mysql");
const chalk = require("chalk");

//Create connection to MySQL Server
const mysqlConnection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_ROOT_NAME, // User for yout SQL Server
	password: process.env.MYSQL_PASSWORD, // Pasword for your SQL Server
	database: process.env.MYSQL_DATABASE_NAME,
});

mysqlConnection.connect(function (err) {
  if (!err) {
    console.log("Conection to database", chalk.bgGreen("Succes!"));
  } else {
    console.log("Conection to database", chalk.bgRed("Fail!"));
    console.group();
    console.log(chalk.red("The error shown below: "));
    console.log(err.message);
  }
});

module.exports = mysqlConnection; //Export module for use into other files
