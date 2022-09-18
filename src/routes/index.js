import { Router } from 'express';
import { setLogInRoutes } from './login.js';
import { setNutritionistsRoutes } from './nutritionists.js';
import { setPatientsRoutes } from './patients.js';
import { setUserRoutes } from './users.js';
<<<<<<< HEAD
import { setPatologiesRoutes } from './patologies.js';
import { setAllergiesRoutes } from './allergies.js';
import { setFoodsRoutes } from './foods.js';
import { setDishesRoutes } from './dishes.js';
import { setDietsRoutes } from './diets.js';
=======
import { setPathologiesRoutes } from './pathologies.js';
import { setDailyDietsRoutes } from './daily_diets.js';
import { setAllergiesRoutes } from './allergies.js';
import { setFoodsRoutes } from './foods.js';
import { setDishesRoutes } from './dishes.js';
>>>>>>> 6e0b3b3cf8acee6ab89ed10274a6308f47ed6b09

const router = Router();

export function setRouter() {
	setNutritionistsRoutes(router);
	setPatientsRoutes(router);
	setUserRoutes(router);
	setLogInRoutes(router);
<<<<<<< HEAD
	setPatologiesRoutes(router);
	setAllergiesRoutes(router)
	setFoodsRoutes(router);
	setDishesRoutes(router);
	setDietsRoutes(router);
=======
	setPathologiesRoutes(router);
	setAllergiesRoutes(router)
	setDailyDietsRoutes(router);
	setFoodsRoutes(router);
	setDishesRoutes(router);
>>>>>>> 6e0b3b3cf8acee6ab89ed10274a6308f47ed6b09
	return router;
}
