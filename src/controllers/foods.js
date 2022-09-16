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

	//#region edit methods

	async createFood(req, res) {
		const query = 'INSERT INTO foods (food_name, description, photo, portion_value, dish_size) VALUES(?, ?, ?, ?, ?)';
		const { food_name, description, photo, portion_value, dish_size } = req.body;
		const name = await this.getFoodByNameMethods(food_name);
		if (name && name.length) {
			res.status(409).json({
				message: 'The food already exists'
			});
		} else {
			this.create(
				query,
				[food_name, description, photo, portion_value, dish_size],
				response => res.status(200).json(response),
				error => res.status(500).json(error)
			);
		}
	}
}
