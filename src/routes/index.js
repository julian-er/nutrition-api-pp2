import { Router } from 'express';

import { setUserRoutes } from './users/users.js';
import { setPatientsRoutes } from './users/patients.js';
import { setNutritionistsRoutes } from './users/nutritionists.js';

import { setFoodsRoutes } from './food/food.js';
import { setFoodsCategoryRoutes } from './food/food_category.js';


import { setPathologiesRoutes } from './health/pathologies.js';
import { setAllergiesRoutes } from './health/allergies.js';

import { setLogInRoutes } from './login.js';
import { setDailyDietsRoutes } from './daily_diets.js';
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
	setFoodsCategoryRoutes(router);
	setDishesRoutes(router);
	setDietsRoutes(router);
	setUserNotesRoutes(router);
	return router;
}
