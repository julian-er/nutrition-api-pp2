import { UsersController } from './users.js';

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

		console.log(user_id);
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
}
