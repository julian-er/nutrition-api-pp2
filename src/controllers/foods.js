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
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	async getFoodByNameMethods(req, res) {
		const query = 'SELECT * FROM foods WHERE food_name= ?';
		const food_name = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [food_name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							message: 'Sorry we have an unexpected error trying fetch food by name',
							error: user.sqlMessage
						})
					);
				}
			});
		});
	}

	//#endregion

	/**
	 * Creates a food
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	//#region POST methods

	async createFood(req, res) {
		const query = 'INSERT INTO foods (food_name, description, photo, food_unit) VALUES(?, ?, ?, ?, ?)';
		const { food_name, description, photo, food_unit } = req.body;
		const name = await this.getFoodByNameMethods(food_name);
		if (name && name.length) {
			res.status(409).json({
				message: 'The food already exists'
			});
		} else {
			this.create(
				query,
				[food_name, description, photo, food_unit],
				response => res.status(200).json(response),
				error => res.status(500).json(error)
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
			[food_name, description, photo, portion_value, dish_size, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
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
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
	//#endregion
}
