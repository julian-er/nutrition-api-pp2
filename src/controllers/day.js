import BaseSQLController from './base-sql.js';

export class DayController extends BaseSQLController {
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
	 * Get all the Days
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getDay(_req, res) {
		const query = `SELECT * FROM day`;

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

	/**
	 * Get a Day by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getDayById(req, res) {
		const query = `SELECT * FROM day WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

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
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}

	//#endregion

	//#region Create Methods

	/**
	 * Creates a Day Diets
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	createDay(req, res) {
		const query = `INSERT INTO day ( date, title, description, user_id) VALUES  (? , ? , ? , ?)`;
		const { date, title, description, user_id } = req.body;

		this.create(
			query,
			[date, title, description, user_id],
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

	//#region EDIT methods

	/**
	 * Edits day
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editDay(req, res) {
		const { id } = req.params;
		const { date, title, description, user_id } = req.body;

		const query = `UPDATE day SET date = ?, title = ?, description = ?, user_id = ? WHERE id = ?`;

		this.edit(
			query,
			[date, title, description, user_id, id],
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

	//#region DELETE Methods

	/**
	 * Deletes a Day
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deleteDay(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM day WHERE id = ?`;

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
