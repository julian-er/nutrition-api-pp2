import { Router } from 'express';
import { FoodsController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */

export function setFoodsRoutes(router) {
	const controller = new FoodsController();
	router.get('/foods', (req, res) => controller.getFoods(req, res));
	router.get('/foods/:id', (req, res) => controller.getFoodById(req, res));
	router.get('/foods/food/:food_name', (req, res) => controller.getFoodByName({ food_name: req.params.food_name }, res));
	router.post('/foods/create', (req, res) => controller.createFood(req, res));
	router.put('/foods/update/:id', (req, res) => controller.editFood(req, res));
	router.delete('/foods/delete/:id', (req, res) => controller.deleteFood(req, res));
}
