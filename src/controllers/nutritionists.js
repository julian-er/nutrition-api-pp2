import bcrypt from 'bcrypt';
import BaseSQLController from './base-sql.js';

export class NutritionistsController extends BaseSQLController {
	constructor() {
		super('nutritionist');
	}

	/**
	 * Gets all the nutritionists
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getNutritionists(_req, res) {
		const query = ` SELECT * FROM nutritionist `;

		this.get(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Gets a nutritionist by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getNutritionistById(req, res) {
		const query = ` SELECT * FROM nutritionist WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Creates a nutritionist
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	createNutritionist(req, res) {
		const query = `INSERT INTO nutritionist ( name, last_name, user, email, password) VALUES  (? , ? , ? , ? , ?)`;
		const { name, last_name, user, email, password } = req.body;

		this.create(
			query,
			[name, last_name, user, email, bcrypt.hashSync(password, 10)],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Edits a nutritionist
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editNutritionist(req, res) {
		const { id } = req.params;
		const { name, last_name } = req.body;
		const query = `UPDATE nutritionist SET name = ? , last_name = ? WHERE id = ?`;

		this.edit(
			query,
			[name, last_name, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Deletes a nutritionist
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getNutritionistById(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM nutritionist WHERE id = ?`;

		this.delete(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
}
