import { Router } from 'express';
import { setLogInRoutes } from './login.js';
import { setNutritionistsRoutes } from './nutritionists.js';
import { setPatientsRoutes } from './patients.js';
import { setUserRoutes } from './users.js';
import { setPathologiesRoutes } from './pathologies.js';
import { setDailyDietsRoutes } from './daily_diets.js';
import { setAllergiesRoutes } from './allergies.js';
import { setFoodsRoutes } from './food.js';
import { setDishesRoutes } from './dishes.js';
import { setDietsRoutes } from './diets.js';
import { setUserNotesRoutes } from './notes.js';

const router = Router();

export function setRouter() {
	setNutritionistsRoutes(router);
	setPatientsRoutes(router);
	setUserRoutes(router);
	setLogInRoutes(router);
	setPathologiesRoutes(router);
	setAllergiesRoutes(router);
	setDailyDietsRoutes(router);
	setFoodsRoutes(router);
	setDishesRoutes(router);
	setDietsRoutes(router);
	setUserNotesRoutes(router);
	return router;
}
