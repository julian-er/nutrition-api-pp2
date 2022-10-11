import { Router } from 'express';
import { PatientsController } from '../../controllers/index.js';

/**
 * Sets the Patients routes
 * @param {Router} router
 */
export function setPatientsRoutes(router) {
	const controller = new PatientsController();
	router.get('/patients', (req, res) => controller.getPatients(req, res));
	router.get('/patients/related/:user_id', (req, res) => controller.getNutritionistPatients({ user_id: req.params.user_id }, res));
}
