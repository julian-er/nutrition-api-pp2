import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class UserNotesController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'note', PluralEntityId ?? 'notes');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'notes';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'note';
	}

	//#region Get Methods

	/**
	 * Gets all Notes
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getUserNotes(_req, res) {
		const query = `SELECT * FROM note`;
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
	 * Creates an user note
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	async createUserNotes(req, res) {
		const query = `INSERT INTO note ( title, date, content ) VALUES  (?, ?, ?)`;
		const { title, date, content } = req.body;

		this.create(
			query,
			[title, date, content],
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

	/**
	 * Edits an user note
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	editUserNote(req, res) {
		const { id } = req.params;
		const query = 'UPDATE note SET title = ?, date = ?, content = ? WHERE id = ?;';
		const { title, date, content } = req.body;
		this.edit(
			query,
			[title, date, content, id],
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

	/**
	 * Deletes an user note
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	deleteUserNote(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM note WHERE id = ?`;

		this.delete(
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
}
