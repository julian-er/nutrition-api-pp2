import { Router } from 'express';
import { LogInController } from '../controllers/index.js';

/**
 * Sets the Nutritionists routes
 * @param {Router} router
 */
export function setLogInRoutes(router) {
	const controller = new LogInController();

	router.post('/login', (req, res) => controller.logIn(req.body, res));
}
