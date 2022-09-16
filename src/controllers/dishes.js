import { response } from 'express';
import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class DishesController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'dish', PluralEntityId ?? 'dishes');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'dishes';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'dish';
	}

	//#region GET methods
	/**
	 * gets all dishes
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	getDishes(_req, res) {
		const query = `SELECT * FROM dishes`;
		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	getDishById(req, res) {
		const { id } = req.params;
		const query = 'SELECT * FROM dishes WHERE id=?';
		this.getById(
			query,
			[id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
	//#endregion

	//#region POST methods
	/**
	 * Creates a dish
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	createDish(req, res) {
		const query =
			'INSERT INTO dishes (dish_name, dish_size, units_total, description, food1_id, food2_id, food3_id, food4_id, food5_id, food6_id, food7_id, food8_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
		const { dish_name, dish_size, units_total, description, food1_id, food2_id, food3_id, food4_id, food5_id, food6_id, food7_id, food8_id } = req.body;
		this.create(
			query,
			[dish_name, dish_size, units_total, description, food1_id, food2_id, food3_id, food4_id, food5_id, food6_id, food7_id, food8_id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
	//#endregion

	//#region PUT methods
	/**
	 * Edits a dish
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editDish(req, res) {
		const { id } = req.params;
		const query =
			'UPDATE dishes SET dish_name=?, dish_size=?, units_total=?, description=?, food1_id=?, food2_id=?, food3_id=?, food4_id=?, food5_id=?, food6_id=?, food7_id=?, food8_id=?  WHERE id = ?;';
		const { dish_name, dish_size, units_total, description, food1_id, food2_id, food3_id, food4_id, food5_id, food6_id, food7_id, food8_id } = req.body;
		this.edit(
			query,
			[dish_name, dish_size, units_total, description, food1_id, food2_id, food3_id, food4_id, food5_id, food6_id, food7_id, food8_id, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	//#region DELETE methods
	/**
	 * Deletes a dish
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	deleteDish(req, res) {
		const { id } = req.params;
		const query = 'DELETE FROM dishes WHERE id=?';
		this.delete(
			query,
			[id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
	//#endregion
}
