import { Router } from 'express';
import { DishController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */

export function setDishRoutes(router) {
	const controller = new DishController();
	router.get('/dish/all', (req, res) => controller.getDishes(req, res));
	router.get('/dish/:id', (req, res) => controller.getDishById(req, res));
	router.post('/dish/create', (req, res) => controller.createDish(req, res));
	router.put('/dish/update/:id', (req, res) => controller.editDish(req, res));
	router.delete('/dish/delete/:id', (req, res) => controller.deleteDish(req, res));
}
