import { Router } from 'express';
import { mysqlConnection } from '../database.js';

/**
 * Sets the Patients routes
 * @param {Router} router
 */
export function setPatientsRoutes(router) {
	//#region GetMethods
	router.get('/patients', (req, res) => {
		const query = ` SELECT * FROM patients `;

		mysqlConnection.query(query, (err, rows, fields) => {
			if (!err) {
				res.status(200).json(rows);
			} else {
				res.status(500).json({
					message: 'Sorry we have an unespected error',
					error: err
				});
			}
		});
	});
	//#endregion
}
