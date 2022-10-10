import BaseSQLController from './base-sql.js';
import { UserNotesController } from './users/user_notes.js';
import { DayController } from './day.js';
import { PatientsController } from './users/patients.js';
import { getAge, getDateFormat } from '../helpers/index.js';

export class DashboardController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'dashboard', PluralEntityId ?? 'dashboard');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'dashboard';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'dashboard';
	}

	//#region Get Methods

	/**
	 * Get dashboard data
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	async get(_req, res) {
		//get notes
		const notesController = new UserNotesController();
		const notes = await notesController.getByUserIdMethod(_req, res);
		const notesRequiredData = notes.map(note => {
			return {
				...note,
				date: `${getDateFormat(note.date)}`
			};
		});
		//get diets
		const dayController = new DayController();
		const days = await dayController.getByUserIdMethod(_req, res);
		const dayRequiredData = days.map(day => {
			return {
				id: day.id,
				title: day.title,
				totalDishes: day.totalDishes,
				patientName: `${day.first_name} ${day.last_name}`,
				patientImage: day.profile_image
			};
		});
		//get users
		const patientsController = new PatientsController();
		const patients = await patientsController.getPatientsByNutritionist(_req, res);
		const patientsRequiredData = patients.map(patient => {
			return {
				id: patient.id,
				name: `${patient.first_name} ${patient.last_name}`,
				age: `${getAge(patient.birth_date)}`
			};
		});

		if (notes || days) {
			res.status(200).json({
				success: true,
				message: '',
				httpStatusCode: 200,
				response: {
					days: dayRequiredData,
					notes: notesRequiredData,
					patients: patientsRequiredData
				}
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

	//#endregion
}
