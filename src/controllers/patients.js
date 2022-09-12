import { UsersController } from './users.js';

export class PatientsController extends UsersController {
    constructor() {
		super('patients');
	}

	/**
	 * Gets all the patients
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getPatients(req, res) {
		const query = `SELECT * FROM users WHERE isPatient = true`;

		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
}
