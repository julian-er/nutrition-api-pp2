import { Router } from 'express';
import { PathologiesController } from '../../controllers/index.js';

/**
 * Sets the Patients routes
 * @param {Router} router
 */
export function setPathologiesRoutes(router) {
	const controller = new PathologiesController();

	router.get('/pathologies/all', (req, res) => controller.getPathologies(req, res));
	router.get('/pathologies/:id', (req, res) => controller.getPathologyById(req, res));
	router.get('/pathologies/pathology/:name', (req, res) => controller.getPathologyByName({ name: req.params.name }, res));
	router.post('/pathologies/create', (req, res) => controller.createPathology(req, res));
	router.put('/pathologies/update/:id', (req, res) => controller.editPathology(req, res));
	router.delete('/pathologies/delete/:id', (req, res) => controller.deletePathology(req, res));

}