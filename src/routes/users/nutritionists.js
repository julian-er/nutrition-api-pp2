import { Router } from 'express';
import { NutritionistsController } from '../../controllers/index.js';

/**
 * Sets the Nutritionists routes
 * @param {Router} router
 */
export function setNutritionistsRoutes(router) {
	const controller = new NutritionistsController();
	router.get('/nutritionists', (req, res) => controller.getNutritionists(req, res));
}
