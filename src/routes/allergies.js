import { Router } from 'express';
import { AllergiesController } from '../controllers/index.js';

/**
 * Sets the Allergies routes
 * @param {Router} router
 */
export function setAllergiesRoutes(router) {
	const controller = new AllergiesController();

	router.get('/allergies', (req, res) => controller.getAllergies(req, res));
	router.post('/allergies/create', (req, res) => controller.createAllergy(req, res));
}
