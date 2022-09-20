import { Router } from 'express';
import { AllergiesController } from '../controllers/index.js';

/**
 * Sets the Allergies routes
 * @param {Router} router
 */
export function setAllergiesRoutes(router) {
	const controller = new AllergiesController();
	router.get('/allergies', (req, res) => controller.getAllergies(req, res));
	router.get('/allergies/:id', (req, res) => controller.getAllergyById(req, res));
	router.get('/allergies/allergy/:allergy_name', (req, res) => controller.getAllergyByName({ allergy_name: req.params.allergy_name }, res));
	router.post('/allergies/create', (req, res) => controller.createAllergy(req, res));
	router.put('/allergies/update/:id', (req, res) => controller.editAllergy(req, res));
	router.delete('/allergies/delete/:id', (req, res) => controller.deleteAllergy(req, res));
}
