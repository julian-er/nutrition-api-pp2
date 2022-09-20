import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class UserNotesController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'user_note', PluralEntityId ?? 'user_notes');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'user_notes';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'user_note';
	}

	getUserNotes(_req, res) {
		const query = `SELECT * FROM user_notes`;
		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Gets an entry by name from any given entity
	 * @param {Request} req The Express request need to have a email
	 * @param {Response} res The Express response
	 */

	async getUserNotesByNameMethod(req, res) {
		const query = 'SELECT * FROM user_notes WHERE note_name = ?';
		const { note_name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [note_name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							message: 'Sorry we have an unexpected error trying fetch note name',
							error: user.sqlMessage
						})
					);
				}
			});
		});
	}

	/**
	 * Creates an user_note
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	async createUserNotes(req, res) {
		const query = `INSERT INTO user_notes ( note_name, user1_id, user2_id, note_date, content ) VALUES  (?, ?, ?, ?, ?)`;
		const { note_name, user1_id, user2_id, note_date, content } = req.body;
		const noteByNoteName = await this.getUserNotesByNameMethod({ note_name: note_name }, res);

		this.create(
			query,
			[note_name, user1_id, user2_id, note_date, content],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Edits an note
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	editUserNote(req, res) {
		const { id } = req.params;
		const query = 'UPDATE user_notes SET note_name = ?, user1_id = ?, user2_id = ?, note_date = ?, content = ? WHERE id = ?;';
		const { note_name, user1_id, user2_id, note_date, content } = req.body;
		this.edit(
			query,
			[note_name, user1_id, user2_id, note_date, content, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Deletes an note
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	deleteUserNote(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM user_notes WHERE id = ?`;

		this.delete(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
}
