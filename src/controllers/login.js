import bcrypt from 'bcrypt';
import { UsersController } from './users.js';
import { generateAccessToken } from '../services/jwt-services.js';

export class LogInController extends UsersController {
	/**
	 * Gets all the nutritionists
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	async logIn(req, res) {
		const { user_name, password } = req;

		if (!user_name || !password) {
			res.status(400).json({ message: `Please provide an user name and password !` });
			return;
		}

		const user = await this.getByUserMethod(req, res);

		// Review if password and user_name are valid
		if (user) {
			if (user.length) {
				const queriedUser = user[0];
				if (bcrypt.compareSync(password, queriedUser.password) && queriedUser.isNutritionist) {
					res.status(200).json({
						token: generateAccessToken(queriedUser),
						message: 'Login success!'
					});
				} else if (!isNutritionist) {
					res.status(401).json({
						message: `Oops! Only nutritionists can access to dashboard for now.`
					});
				} else {
					res.status(401).json({
						message: `Incorrect password`
					});
				}
			} else {
				res.status(404).json({
					message: `Sorry ${this.SingularEntityId} with username: ${user_name} not found`
				});
			}
		}
	}
}
