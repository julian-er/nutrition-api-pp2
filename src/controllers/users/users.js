import bcrypt from 'bcrypt';
import { mysqlConnection } from '../../database.js';
import BaseSQLController from '../base-sql.js';

export class UsersController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'user', PluralEntityId ?? 'users');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'users';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'user';
	}
	//#region Get Methods

	/**
	 * Gets all the users
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getUsers(_req, res) {
		const query = `SELECT * FROM user`;

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
	 * Gets a users by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getUserById(req, res) {
		const query = `SELECT * FROM user WHERE id = ? `;
		const { id } = req.params;

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

	/**
	 * Gets an entry by user_name from any given entity
	 * @param {Request} req The Express request need to have a user_name
	 * @param {Response} res The Express response
	 */
	async getByUserMethod(req, res) {
		const { user_name } = req;
		const query = `SELECT * FROM user WHERE user_name = ? `;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [user_name], (error, rows, _fields) => {
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

	/**
	 * Gets an entry by email from any given entity
	 * @param {Request} req The Express request need to have a email
	 * @param {Response} res The Express response
	 */
	async getByEmailMethod(req, res) {
		const query = 'SELECT * FROM user WHERE email = ?';
		const { email } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [email], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							success: false,
							message: 'Sorry we have an unexpected error trying fetch user by user email',
							httpStatusCode: 500,
							response: error.sqlMessage
						})
					);
				}
			});
		});
	}

	/**
	 * Gets an entry by user_name from any given entity
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	async getUserByUserName(req, res) {
		const { user_name } = req;
		const user = await this.getByUserMethod(req, res);
		if (user) {
			if (user.length) {
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: user[0]
				});
			} else {
				res.status(404).json({
					success: false,
					message: `Sorry ${this.SingularEntityId} with username: ${user_name} not found`,
					httpStatusCode: 404,
					response: user
				});
			}
		}
	}

	/**
	 * Gets a users by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getUserMeasures(req, res) {
		const query = `SELECT * FROM user_measures_history WHERE user_id = ? `;
		const { id } = req.params;
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

	//#region Create

	/**
	 * Creates a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	async createUser(req, res) {
		const query = `INSERT INTO user ( user_name, password, email, first_name, last_name, phone_number, birth_date , profile_image, isNutritionist, isPatient) VALUES  (? , ? , ? , ? , ?, ? , ? , ? , ? , ?)`;
		const { user_name, password, email, first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient } = req.body;

		const userByUserMethod = await this.getByUserMethod({ user_name: user_name }, res);
		const userByEmailMethod = await this.getByEmailMethod({ email: email }, res);

		if (userByUserMethod || userByEmailMethod) {
			if (userByUserMethod && userByUserMethod.length) {
				res.status(409).json({
					success: false,
					message: 'The user name is already in use',
					httpStatusCode: 409,
					response: []
				});
			} else if (userByEmailMethod && userByEmailMethod.length) {
				res.status(409).json({
					success: false,
					message: 'The email name is already in use',
					httpStatusCode: 409,
					response: []
				});
			} else {
				this.create(
					query,
					[user_name, bcrypt.hashSync(password, 10), email, first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient],
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
		}
	}

	/**
	 * Creates new measure register
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	async createMeasureRegisterUser(req, res) {
		const query = `INSERT INTO user_measures_history ( user_id, date, height, weight ) VALUES  (? , ? , ? , ? )`;
		const { user_id, date, height, weight } = req.body;

		this.create(
			query,
			[user_id, date, height, weight],
			response =>
				res.status(200).json({
					success: true,
					message: 'The measure register was created successfully',
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

	//#endregion CREATE

	//#region EDIT methods

	/**
	 * Edits a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editUser(req, res) {
		const { id } = req.params;
		const { first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient } = req.body;

		const query = `UPDATE user SET first_name = ?, last_name = ?, phone_number = ?, birth_date = ? , profile_image = ?, isNutritionist = ?, isPatient = ? WHERE id = ?`;

		this.edit(
			query,
			[first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient, id],
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

	/**
	 * Change Password
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	changePassword(req, res) {
		const { id } = req.params;
		const { password } = req.body;

		// TODO : Verify previous password before change it
		const query = `UPDATE user SET password = ? WHERE id = ?`;

		this.edit(
			query,
			[bcrypt.hashSync(password, 10), id],
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

	/**
	 * Change Mail
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	changeMail(req, res) {
		const { id } = req.params;
		const { email } = req.body;

		// TODO : Verify previous email before change it
		const query = `UPDATE user SET email = ? WHERE id = ?`;

		this.edit(
			query,
			[email, id],
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

	/**
	 * Change User Name
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	changeUserName(req, res) {
		const { id } = req.params;
		const { user_name } = req.body;

		// TODO : Verify previous user_name before change it
		const query = `UPDATE user SET user_name = ? WHERE id = ?`;

		this.edit(
			query,
			[user_name, id],
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

	/**
	 * Change measure register
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	async changeMeasureRegisterUser(req, res) {
		const { id } = req.params;
		const { user_id, date, height, weight } = req.body;
		const query = `UPDATE user_measures_history SET user_id = ?, date = ?, height = ?, weight = ? WHERE id = ?`;

		this.edit(
			query,
			[user_id, date, height, weight, id],
			response =>
				res.status(200).json({
					success: true,
					message: 'The measure register was updated successfully',
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

	/**
	 * Deletes a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deleteUser(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM user WHERE id = ?`;

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

	/**
	 * Deletes a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deleteMeasureRegister(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM user_measures_history WHERE id = ?`;

		this.delete(
			query,
			id,
			response =>
				res.status(200).json({
					success: true,
					message: "Register delete successfully",
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
}
