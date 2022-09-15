import express from 'express';
import chalk from 'chalk';
import { setRouter } from './routes/index.js';
import { connectDatabase } from './database.js';

// Express initialization
const app = express();
const port = process.env.PORT || 8000;
connectDatabase()
	.then(() => {
		const router = setRouter();
		//Settings
		app
			//Middleware
			.use(express.json()) // use JSON format
			//Routes
			.use('/', router)
			//Start Server
			.listen(port, () => {
				console.log(chalk.green('######################################'));
				console.log(chalk.green('#####                            #####'));
				console.log(chalk.green('#####    Educar en Nutrición     #####'));
				console.log(chalk.green('#####           API              #####'));
				console.log(chalk.green('#####                            #####'));
				console.log(chalk.green('######################################'));
				console.log('The server is up and running! ', port);
				console.log(`You can access here -> http://localhost:${port}`);
			});
	})
	.catch(error => console.log(chalk.red(error)));
