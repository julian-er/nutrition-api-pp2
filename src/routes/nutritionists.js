import { Router } from 'express';
import { NutritionistsController } from '../controllers/index.js';

/**
 * Sets the Nutritionists routes
 * @param {Router} router
 */
export function setNutritionistsRoutes(router) {
	const controller = new NutritionistsController();

	router.get('/nutritionists', (req, res) => controller.getNutritionists(req, res));
	router.get('/nutritionists/:id', (req, res) => controller.getNutritionistById(req, res));
	router.post('/nutritionists', (req, res) => controller.createNutritionist(req, res));
	router.put('/nutritionists/:id', (req, res) => controller.editNutritionist(req, res));
	router.delete('/nutritionists/:id', (req, res) => controller.deleteNutritionist(req, res));
}
