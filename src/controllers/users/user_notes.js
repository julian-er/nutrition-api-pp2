import BaseSQLController from '../base-sql.js';
import { mysqlConnection } from '../../database.js';

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
	getAllNotes(_req, res) {
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
	 * Gets all Notes
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	async getUserNotes(req, res) {
		const { user_id } = req;
		const notes = await this.getByUserIdMethod(req, res);

		if (notes) {
			if (notes.length) {
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: notes
				});
			} else {
				res.status(404).json({
					success: false,
					message: `Sorry ${this.PluralEntityId} with userId: ${user_id} not found`,
					httpStatusCode: 404,
					response: user
				});
			}
		}

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

	//#region methods
	/**
	 * Gets an entry by user_name from any given entity
	 * @param {Request} req The Express request need to have a user_name
	 * @param {Response} res The Express response
	 */
	async getByUserIdMethod(req, res) {
		const { user_id } = req;
		const query = `
			SELECT n.id, n.title, n.date, n.content FROM user_note un
			JOIN note n 
			ON un.note_id = n.id
			WHERE user_id = ? 
			ORDER BY n.date DESC 
		`;
		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [user_id], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							success: false,
							message: 'Sorry we have an unexpected error trying fetch user by user name',
							httpStatusCode: 500,
							response: error.sqlMessage
						})
					);
				}
			});
		});
	}
	//#endregion
}
