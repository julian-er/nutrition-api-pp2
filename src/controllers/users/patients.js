import { UsersController } from './users.js';
import { mysqlConnection } from '../../database.js';

export class PatientsController extends UsersController {
	constructor() {
		super('patient', 'patients');
	}

	/**
	 * Gets all the patients
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getPatients(req, res) {
		const query = `SELECT * FROM user WHERE isPatient = true`;

		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	/**
	 * Gets an entry by nutritionist user_id from users
	 * @param {Request} req The Express request need to have a user_name
	 * @param {Response} res The Express response
	 */
	async getPatientsByNutritionist(req, res) {
		const { user_id } = req;
		const query = `SELECT u.first_name, u.last_name, u.birth_date, u.id
						FROM user u
						JOIN nutritionist_patients_relation npr
						ON npr.patient_id = u.id
						WHERE npr.nutritionist_id = ?
						AND u.isPatient = true
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
}
