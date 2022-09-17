import { Router } from 'express';
import { DishesController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */

export function setDishesRoutes(router) {
	const controller = new DishesController();
	router.get('/dishes', (req, res) => controller.getDishes(req, res));
	router.get('/dishes/:id', (req, res) => controller.getDishById(req, res));
	router.post('/dishes/create', (req, res) => controller.createDish(req, res));
	router.put('/dishes/:id', (req, res) => controller.editDish(req, res));
	router.delete('/dishes/:id', (req, res) => controller.deleteDish(req, res));
}
