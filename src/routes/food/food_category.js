import { Router } from 'express';
import { FoodCategoryController } from '../../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */

export function setFoodsCategoryRoutes(router) {
	const controller = new FoodCategoryController();
	router.get('/food/category/all', (req, res) => controller.getFoodCategories(req, res));
	router.get('/food/category/:id', (req, res) => controller.getFoodCategoryById(req, res));
	router.get('/food/category/single/:name', (req, res) => controller.getFoodCategoryByName({ name: req.params.name }, res));
	router.post('/food/category/create', (req, res) => controller.createCategoryFood(req, res));
	router.put('/food/category/update/:id', (req, res) => controller.editCategory(req, res));
	router.delete('/food/category/delete/:id', (req, res) => controller.deleteCategory(req, res));
}
