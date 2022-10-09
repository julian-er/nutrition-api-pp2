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
		const query = `SELECT * FROM users WHERE isPatient = true`;

		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

	
	async getNutritionistPatients(req, res){
		const { id } = req.params;
		const query= `SELECT r.patient_id, u.user_name, u.first_name, u.email, u.last_name, u.phone_number, u.birth_date, u.profile_image FROM nutritionist_patients_relation r JOIN user u on u.id = r.nutritionist_id WHERE nutritionist_id = ?;`
		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
	
}
