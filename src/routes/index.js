import { Router } from 'express';
import { setLogInRoutes } from './login.js';
import { setNutritionistsRoutes } from './nutritionists.js';
import { setPatientsRoutes } from './patients.js';
import { setUserRoutes } from './users.js';
import { setPatologiesRoutes } from './patologies.js';
import { setAllergiesRoutes } from './allergies.js';
import { setDailyDietsRoutes } from './daily_diets.js';

const router = Router();

export function setRouter() {
	setNutritionistsRoutes(router);
	setPatientsRoutes(router);
	setUserRoutes(router);
	setLogInRoutes(router);
	setPatologiesRoutes(router);
	setAllergiesRoutes(router)
	setDailyDietsRoutes(router);
	return router;
}
