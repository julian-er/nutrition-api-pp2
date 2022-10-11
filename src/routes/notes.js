import { Router } from 'express';
import { UserNotesController } from '../controllers/index.js';

/**
 * Sets the Notes routes
 * @param {Router} router
 */
export function setUserNotesRoutes(router) {
	const controller = new UserNotesController();

	router.get('/notes/all', (req, res) => controller.getAllNotes(req, res));
	router.get('/notes/user/:user_id', (req, res) => controller.getUserNotes({ user_id: req.params.user_id }, res));
	router.get('/notes/nutritionist/personal-notes/:user_id', (req, res) => controller.getOnlyNutritionistNotes({ user_id: req.params.user_id }, res));
	router.get('/notes/nutritionist/patients-notes/:user_id', (req, res) => controller.getMyPatientsNotes({ user_id: req.params.user_id }, res));
	router.post('/notes/create', (req, res) => controller.createUserNotes(req, res));
	router.put('/notes/update/:id', (req, res) => controller.editUserNote(req, res));
	router.delete('/notes/delete/:id', (req, res) => controller.deleteUserNote(req, res));
}
