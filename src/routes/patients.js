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
	router.get('/patients/user/:user_name', (req, res) => controller.getUserByUserName(req, res));
	router.post('/patients', (req, res) => controller.createUser(req, res));
	router.put('/patients/:id', (req, res) => controller.editUser(req, res));
	router.put('/patients/update-user/:id', (req, res) => controller.changeUserName(req, res));
	router.put('/patients/update-mail/:id', (req, res) => controller.changeMail(req, res));
	router.put('/patients/update-password/:id', (req, res) => controller.changePassword(req, res));
	router.delete('/patients/:id', (req, res) => controller.deleteUser(req, res));
}
