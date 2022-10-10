import BaseSQLController from './base-sql.js';
import { mysqlConnection } from '../database.js';
import { UserNotesController } from './users/user_notes.js';
import { DayController } from './day.js';
import { PatientsController } from './users/patients.js';

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
		//get diets
		const dayController = new DayController();
		const days = await dayController.getByUserIdMethod(_req, res);
		//get users
        const patientsController = new PatientsController();
        const patients = await patientsController.getPatientsByNutritionist(_req, res)

		if ( notes || days) {
			res.status(200).json({
				success: true,
				message: '',
				httpStatusCode: 200,
				response: {
					days: days,
					notes: notes,
                    patients: patients
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
