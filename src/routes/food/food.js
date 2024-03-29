import { Router } from 'express';
import { FoodsController } from '../../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */

export function setFoodsRoutes(router) {
	const controller = new FoodsController();
	router.get('/food/all', (req, res) => controller.getFoods(req, res));
	router.get('/food/:id', (req, res) => controller.getFoodById(req, res));
	router.get('/food/single/:name', (req, res) => controller.getFoodByName({ name: req.params.name }, res));
	router.post('/food/create', (req, res) => controller.createFood(req, res));
	router.put('/food/update/:id', (req, res) => controller.editFood(req, res));
	router.delete('/food/delete/:id', (req, res) => controller.deleteFood(req, res));
}
