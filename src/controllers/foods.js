import { response } from 'express';
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
		const query = `SELECT * FROM foods`;
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
		const query = `SELECT * FROM foods WHERE id = ? `;
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
		const query = 'SELECT * FROM foods WHERE food_name= ?';
		const food_name = req;
		console.log(food_name);
		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [food_name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							success: false,
							message: `Sorry ${this.SingularEntityId} with name: ${food_name} not found`,
							httpStatusCode: 404,
							response: error.sqlMessage
						})
					);
				}
			});
		});
	}

	async getFoodByName(req, res) {
		const { food_name } = req.params;
		const food = await this.getFoodByNameMethod(food_name, res);
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
					message: `Sorry ${this.SingularEntityId} with name: ${food_name} not found`,
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
		const query = 'INSERT INTO foods (food_name, description, photo, food_unit) VALUES(?, ?, ?, ?)';
		const { food_name, description, photo, food_unit } = req.body;
		const name = await this.getFoodByNameMethod(food_name);
		if (name && name.length) {
			res.status(409).json({
				success: false,
				message: 'The food name is already in use',
				httpStatusCode: 409,
				response: []
			});
		} else {
			this.create(
				query,
				[food_name, description, photo, food_unit],
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
						response: []
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
		const query = 'UPDATE foods SET food_name = ?, description= ?, photo= ?, food_unit= ?  WHERE id = ?;';
		const { food_name, description, photo, food_unit } = req.body;
		this.edit(
			query,
			[food_name, description, photo, food_unit, id],
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
		const query = `DELETE FROM foods WHERE id = ?`;

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
