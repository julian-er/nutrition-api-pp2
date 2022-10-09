import { Router } from 'express';
import { DayController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */
export function setDayRoutes(router) {
	const controller = new DayController();

	router.get('/day/all', (req, res) => controller.getDay(req, res));
	router.get('/day/:id', (req, res) => controller.getDayById(req, res));
	router.post('/day/create', (req, res) => controller.createDay(req, res));
	router.put('/day/update/:id', (req, res) => controller.editDay(req, res));
	router.delete('/day/:id', (req, res) => controller.deleteDay(req, res));
}
