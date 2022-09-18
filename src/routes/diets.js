import { Router } from 'express';
import { DietsController } from '../controllers/index.js';

/**
 * Sets the Diets routes
 * @param {Router} router
 */
export function setDietsRoutes(router) {
	const controller = new DietsController();

	router.get('/diets', (req, res) => controller.getDiets(req, res));
	router.post('/diets/create', (req, res) => controller.createDiets(req, res));
	router.put('/diets/update/:id', (req, res) => controller.editDiets(req, res));
	router.delete('/diets/delete/:id', (req, res) => controller.deleteDiets(req, res));

}