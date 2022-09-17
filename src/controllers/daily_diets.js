import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class DailyDietController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'daily diet', PluralEntityId ?? 'daily diets');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'daily diets';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'daily diet';
	}

	//#region Get Methods

	/**
	 * Gets all the Daily Diets
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getDailyDiets(_req, res) {
		const query = `SELECT * FROM daily_diets`;

		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Gets a Daily Diet by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getDailyDietById(req, res) {
		const query = `SELECT * FROM daily_diets WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Creates a Daily Diets
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	createDailyDiet(req, res) {
		const query = `INSERT INTO daily_diets ( dish1_id, dish2_id, dish3_id, dish4_id) VALUES  (? , ? , ? , ?)`;
		const { dish1_id, dish2_id, dish3_id, dish4_id } = req.body;

		this.create(
			query,
			[dish1_id, dish2_id, dish3_id, dish4_id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	//#region EDIT methods

	/**
	 * Edits a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editDailyDiet(req, res) {
		const { id } = req.params;
		const { dish1_id, dish2_id, dish3_id, dish4_id } = req.body;

		const query = `UPDATE daily_diets SET dish1_id = ?, dish2_id = ?, dish3_id = ?, dish4_id = ? WHERE id = ?`;

		this.edit(
			query,
			[dish1_id, dish2_id, dish3_id, dish4_id, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Deletes a Daily_Diets
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deleteDailyDiet(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM daily_diets WHERE id = ?`;

		this.delete(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
}
