import { Router } from 'express';
import { FoodsController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */

export function setFoodsRoutes(router) {
	const controller = new FoodsController();
	router.get('/foods', (req, res) => controller.getFoods(req, res));
	router.post('/foods/create', (req, res) => controller.createFood(req, res));
	router.put('/foods/:id', (req, res) => controller.editFood(req, res));
	router.delete('/foods/:id', (req, res) => controller.deleteFood(req, res));
}
