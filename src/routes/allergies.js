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
<<<<<<< HEAD
	router.put('/allergies/:id', (req, res) => controller.editAllergy(req, res));
	router.delete('/allergies/:id', (req, res) => controller.deleteAllergy(req, res));
=======
	router.put('/allergies/update/:id', (req, res) => controller.editAllergy(req, res));
	router.delete('/allergies/delete/:id', (req, res) => controller.deleteAllergy(req, res));

>>>>>>> 6e0b3b3cf8acee6ab89ed10274a6308f47ed6b09
}
