import { Router } from 'express';
import { setLogInRoutes } from './login.js';
import { setNutritionistsRoutes } from './nutritionists.js';
import { setPatientsRoutes } from './patients.js';
import { setUserRoutes } from './users.js';

const router = Router();

export function setRouter() {
	setNutritionistsRoutes(router);
	setPatientsRoutes(router);
	setUserRoutes(router);
	setLogInRoutes(router);
	return router;
}
