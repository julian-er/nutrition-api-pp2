import { UsersController } from './users.js';

export class NutritionistsController extends UsersController {
	constructor() {
		super('nutritionist');
	}

	/**
	 * Gets all the nutritionists
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getNutritionists(req, res) {
		const query = `SELECT * FROM users WHERE isNutritionist = true`;

		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

}
