import { Router } from 'express';
import { DashboardController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */
export function setDashboardRoutes(router) {
	const controller = new DashboardController();

	router.get('/dashboard/:user_id', (req, res) => controller.get({ user_id: req.params.user_id }, res));

}
