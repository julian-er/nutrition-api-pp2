import { Router } from 'express';
import { setNutritionistsRoutes } from './nutritionists.js';
import { setPatientsRoutes } from './patients.js';

const router = Router();

export function setRouter() {
	setNutritionistsRoutes(router);
	setPatientsRoutes(router);
	return router;
}
