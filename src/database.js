import { createConnection } from 'mysql';
import chalk from 'chalk';

//Create connection to MySQL Server
export const mysqlConnection = createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_ROOT_NAME, // User for your SQL Server
	password: process.env.MYSQL_PASSWORD, // Password for your SQL Server
	database: process.env.MYSQL_DATABASE_NAME,
	multipleStatements: true,
	insecureAuth: true
});

export function connectDatabase() {
	return new Promise((resolve, reject) => {
		mysqlConnection.connect(error => {
			if (!error) {
				console.log('Connection to database', chalk.bgGreen('Success!'));
				resolve();
			} else {
				console.log('Connection to database', chalk.bgRed('Fail!'));
				console.log(chalk.red('The error shown below: '));
				reject(error);
			}
		});
	});
}

//Export module for use into other files
