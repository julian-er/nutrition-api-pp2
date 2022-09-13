import { Router } from 'express';
import { NutritionistsController } from '../controllers/index.js';

/**
 * Sets the Nutritionists routes
 * @param {Router} router
 */
export function setNutritionistsRoutes(router) {
	const controller = new NutritionistsController();

	router.get('/nutritionists', (req, res) => controller.getNutritionists(req, res));
	router.get('/nutritionists/:id', (req, res) => controller.getUserById(req, res));
	router.get('/nutritionists/user/:user_name', (req, res) => controller.getUserByUserName(req, res));
	router.post('/nutritionists', (req, res) => controller.createUser(req, res));
	router.put('/nutritionists/:id', (req, res) => controller.editUser(req, res));
	router.put('/nutritionists/update-user/:id', (req, res) => controller.changeUserName(req, res));
	router.put('/nutritionists/update-mail/:id', (req, res) => controller.changeMail(req, res));
	router.put('/nutritionists/update-password/:id', (req, res) => controller.changePassword(req, res));
	router.delete('/nutritionists/:id', (req, res) => controller.deleteUser(req, res));
}
