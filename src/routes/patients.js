import { Router } from 'express';
import { PatientsController } from '../controllers/index.js';

/**
 * Sets the Patients routes
 * @param {Router} router
 */
export function setPatientsRoutes(router) {
	const controller = new PatientsController();

	router.get('/patients', (req, res) => controller.getPatients(req, res));
	router.get('/patients/:id', (req, res) => controller.getUserById(req, res));
	router.post('/patients', (req, res) => controller.createUser(req, res));
	router.put('/patients/:id', (req, res) => controller.editUser(req, res));
	router.delete('/patients/:id', (req, res) => controller.deleteUser(req, res));
}
