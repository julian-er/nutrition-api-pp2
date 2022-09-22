import { Router } from 'express';
import { DailyDietController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */
export function setDailyDietsRoutes(router) {
	const controller = new DailyDietController();

    router.get('/daily_diets', (req, res) => controller.getDailyDiets(req, res));
	router.get('/daily_diets/:id', (req, res) => controller.getDailyDietsById(req, res));
	router.post('/daily_diets/create', (req, res) => controller.createDailyDiet(req, res));
	router.put('/daily_diets/:id', (req, res) => controller.editDailyDiet(req, res));
	router.delete('/daily_diets/:id', (req, res) => controller.deleteDailyDiet(req, res));

}