import { Router } from 'express';
import { setUserRoutes } from './users/users.js';
import { setPatientsRoutes } from './users/patients.js';
import { setNutritionistsRoutes } from './users/nutritionists.js';
import { setFoodsRoutes } from './food/food.js';
import { setFoodsCategoryRoutes } from './food/food_category.js';
import { setPathologiesRoutes } from './health/pathologies.js';
import { setAllergiesRoutes } from './health/allergies.js';
import { setLogInRoutes } from './login.js';
import { setDayRoutes } from './day.js';
import { setDishRoutes } from './dish.js';
import { setUserNotesRoutes } from './notes.js';
import { setDashboardRoutes } from './dashboard.js';

const router = Router();

export function setRouter() {
	setNutritionistsRoutes(router);
	setPatientsRoutes(router);
	setUserRoutes(router);
	setLogInRoutes(router);
	setPathologiesRoutes(router);
	setAllergiesRoutes(router);
	setDayRoutes(router);
	setFoodsRoutes(router);
	setFoodsCategoryRoutes(router);
	setDishRoutes(router);
	setUserNotesRoutes(router);
	setDashboardRoutes(router);
	return router;
}
