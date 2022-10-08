import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class FoodsController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'food', PluralEntityId ?? 'foods');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'foods';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'food';
	}

	//#region get methods

	/**
	 * Gets all foods
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	getFoods(_req, res) {
		const query = `SELECT * FROM food`;
		this.getAll(
			query,
			response =>
				res.status(200).json({
					success: true,
					message: response.message,
					httpStatusCode: 200,
					response: response
				}),
			error =>
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}

	getFoodById(req, res) {
		const query = `SELECT * FROM food WHERE id = ? `;
		const { id } = req.params;

		this.getById(
			query,
			id,
			response =>
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: response
				}),
			error =>
				res.status(404).json({
					success: false,
					message: error.message,
					httpStatusCode: 404,
					response: error.error
				})
		);
	}

	async getFoodByNameMethod(req, res) {
		const query = 'SELECT * FROM food WHERE name= ?';
		const { name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							success: false,
							message: `Sorry ${this.SingularEntityId} with name: ${name} not found`,
							httpStatusCode: 404,
							response: error.sqlMessage
						})
					);
				}
			});
		});
	}

	async getFoodByName(req, res) {
		const { name } = req;
		const food = await this.getFoodByNameMethod(req, res);
		if (food) {
			if (food.length) {
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: food[0]
				});
			} else {
				res.status(404).json({
					success: false,
					message: `Sorry ${this.SingularEntityId} with name: ${name} not found`,
					httpStatusCode: 404,
					response: food
				});
			}
		}
	}

	//#endregion

	/**
	 * Creates a food
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	//#region POST methods

	async createFood(req, res) {
		const query = 'INSERT INTO food (name, description, image) VALUES(?, ?, ?)';
		const { name, description, image } = req.body;
		const food_name = await this.getFoodByNameMethod({ name : name }, res);
		if (food_name && food_name.length) {
			res.status(409).json({
				success: false,
				message: 'The food name is already in use',
				httpStatusCode: 409,
				response: []
			});
		} else {
			this.create(
				query,
				[name, description, image],
				response =>
					res.status(200).json({
						success: true,
						message: response.message,
						httpStatusCode: 200,
						response: []
					}),
				error =>
					res.status(500).json({
						success: false,
						message: error.message,
						httpStatusCode: 500,
						response: error.error
					})
			);
		}
	}

	//#endregion

	//#region edit methods
	/**
	 * Edits a food
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	editFood(req, res) {
		const { id } = req.params;
		const query = 'UPDATE food SET name = ?, description= ?, image= ?  WHERE id = ?;';
		const { name, description, image } = req.body;
		this.edit(
			query,
			[name, description, image, id],
			response =>
				res.status(200).json({
					success: true,
					message: response.message,
					httpStatusCode: 200,
					response: []
				}),
			error =>
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}
	//#endregion

	//#region DELETE methods

	/**
	 * Deletes a food
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deleteFood(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM food WHERE id = ?`;

		this.delete(
			query,
			id,
			response =>
				res.status(200).json({
					success: true,
					message: response.message,
					httpStatusCode: 200,
					response: []
				}),
			error =>
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}
	//#endregion
}
