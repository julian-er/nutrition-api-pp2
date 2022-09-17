import { Router } from 'express';
import { PatologiesController } from '../controllers/index.js';

/**
 * Sets the Patients routes
 * @param {Router} router
 */
export function setPatologiesRoutes(router) {
	const controller = new PatologiesController();

	router.get('/patologies', (req, res) => controller.getPatologies(req, res));
	router.post('/patologies/create', (req, res) => controller.createPatology(req, res));
	router.put('/patologies/update/:id', (req, res) => controller.editPatology(req, res));
	router.delete('/patologies/delete/:id', (req, res) => controller.deletePatology(req, res));

}