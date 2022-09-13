import bcrypt from 'bcrypt';
import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class UsersController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'user', PluralEntityId ?? 'users');
		this.PluralEntityId = PluralEntityId ? PluralEntityId :  'users';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'user';
	}

	//#region Get Methods

	/**
	 * Gets all the users
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getUsers(_req, res) {
		const query = `SELECT * FROM users`;

		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Gets a users by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getUserById(req, res) {
		const query = `SELECT * FROM users WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Gets an entry by user_name from any given entity
	 * @param {string} query The SQL query
	 * @param {string} user_name The entity user_name
	 * @param {(response: any) => void} onSuccess The success callback
	 * @param {(error: Error) => void} onError The error callback
	 */
	getUserByUserName(req, res) {
		const { user_name } = req.params;
		const query = `SELECT * FROM users WHERE user_name = ? `;

		mysqlConnection.query(query, [user_name], (error, rows, fields) => {
			if (!error) {
				console.log(rows)
				if(rows.length){
					res.status(200).json(rows)[0];
				}else{
					res.status(404).json({
						message: `Sorry ${this.entityId} with username: ${user_name} not found`,
					});
				}
			} else {
				res.status(500).json({
					message: 'Sorry we have an unexpected error',
					error: error.sqlMessage
				});
			}
		});
	}

	//#endregion

	/**
	 * Creates a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	createUser(req, res) {
		const query = `INSERT INTO users ( user_name, password, email, first_name, last_name, phone_number, birth_date , profile_image, isNutritionist, isPatient) VALUES  (? , ? , ? , ? , ?, ? , ? , ? , ? , ?)`;
		const { user_name, password, email, first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient } = req.body;

		this.create(
			query,
			[user_name, bcrypt.hashSync(password, 10), email, first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient],
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
	editUser(req, res) {
		const { id } = req.params;
		const { first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient } = req.body;

		const query = `UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, birth_date = ? , profile_image = ?, isNutritionist = ?, isPatient = ? WHERE id = ?`;

		this.edit(
			query,
			[first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Change Password
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	changePassword(req, res) {
		const { id } = req.params;
		const { password } = req.body;

		// TODO : Verify previous password before change it
		const query = `UPDATE users SET password = ? WHERE id = ?`;

		this.edit(
			query,
			[bcrypt.hashSync(password, 10), id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Change Mail
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	changeMail(req, res) {
		const { id } = req.params;
		const { email } = req.body;

		// TODO : Verify previous email before change it
		const query = `UPDATE users SET email = ? WHERE id = ?`;

		this.edit(
			query,
			[email, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Change User Name
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	changeUserName(req, res) {
		const { id } = req.params;
		const { user_name } = req.body;

		// TODO : Verify previous user_name before change it
		const query = `UPDATE users SET user_name = ? WHERE id = ?`;

		this.edit(
			query,
			[user_name, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	//#endregion

	/**
	 * Deletes a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deleteUser(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM users WHERE id = ?`;

		this.delete(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
}
