const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const chalk = require('chalk');
const app = express();

//Settings
app.set('port', process.env.PORT || 8000);

//Middleware
app.use(express.json()); // use JSON format

//Routes
app.use(require('./routes/nutritionists'));
app.use(require('./routes/patients'));

//Start Server
app.listen(app.get('port'), () => {
	console.log(chalk.green('######################################'));
	console.log(chalk.green('#####                            #####'));
	console.log(chalk.green('#####    Educar en Nutrición     #####'));
	console.log(chalk.green('#####           API              #####'));
	console.log(chalk.green('#####                            #####'));
	console.log(chalk.green('######################################'));
	console.group();
	console.log('The server is up and running! ', app.get('port'));
	console.log('You can access here -> http://localhost:8000');
});
