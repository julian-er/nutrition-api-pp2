import BaseSQLController from './base-sql.js';

export class DishController extends BaseSQLController {
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
		const query = `SELECT * FROM dish`;
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

	getDishById(req, res) {
		const { id } = req.params;
		const query = 'SELECT * FROM dish WHERE id=?';
		this.getById(
			query,
			[id],
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
	//#endregion

	//#region POST methods
	/**
	 * Creates a dish
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	createDish(req, res) {
		const query = 'INSERT INTO dish (date, title, day_part_id) VALUES(?,?,?)';
		const { date, title, day_part_id } = req.body;
		this.create(
			query,
			[date, title, day_part_id],
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

	//#region PUT methods
	/**
	 * Edits a dish
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editDish(req, res) {
		const { id } = req.params;
		const query =
			'UPDATE dish SET date=?, title=?, day_part_id=?  WHERE id = ?';
		const { date, title, day_part_id } = req.body;
		this.edit(
			query,
			[date, title, day_part_id, id],
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

	//#region DELETE methods
	/**
	 * Deletes a dish
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	deleteDish(req, res) {
		const { id } = req.params;
		const query = 'DELETE FROM dish WHERE id=?';
		this.delete(
			query,
			[id],
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
