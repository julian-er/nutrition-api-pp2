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

	async getNutritionistPatients(req, res) {
		const { user_id } = req;
		const query = `
		SELECT u.id, u.user_name, u.first_name, u.email, u.last_name, u.phone_number, u.birth_date, u.profile_image
		FROM nutritionist_patients_relation nr
		JOIN user u
		ON u.id = nr.patient_id
		WHERE nr.nutritionist_id = ?
		`;

		this.getById(
			query,
			[user_id],
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
