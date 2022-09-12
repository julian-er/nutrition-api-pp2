import bcrypt from 'bcrypt';
import { response } from 'express';
import BaseSQLController from './base-sql.js';

export class UsersController extends BaseSQLController {
	/**
	 * @param {string} entityId The entity ID
	 */
	constructor(entityId) {
		super(entityId);
	}

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

	/**
	 * Edits a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	async editUser(req, res) {
		const { id } = req.params;
		const { first_name, last_name, phone_number, birth_date, profile_image, isNutritionist, isPatient } = req.body;
       
		const query = `UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, birth_date = ? , profile_image = ?, isNutritionist = ?, isPatient = ? WHERE id = ?`;

		this.edit(
			query,
			[first_name, last_name, phone_number, birth_date , profile_image, isNutritionist, isPatient, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

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
