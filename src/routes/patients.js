import { Router } from 'express';
import { PatientsController } from '../controllers/index.js';

/**
 * Sets the Patients routes
 * @param {Router} router
 */
export function setPatientsRoutes(router) {
	const controller = new PatientsController();

	router.get('/patients', (req, res) => controller.getPatients(req, res));
}
