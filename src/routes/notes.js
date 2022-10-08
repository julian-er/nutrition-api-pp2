import { Router } from 'express';
import { UserNotesController } from '../controllers/index.js';

/**
 * Sets the Notes routes
 * @param {Router} router
 */
export function setUserNotesRoutes(router) {
	const controller = new UserNotesController();

	router.get('/notes', (req, res) => controller.getUserNotes(req, res));
	router.post('/notes/create', (req, res) => controller.createUserNotes(req, res));
	router.put('/notes/update/:id', (req, res) => controller.editUserNote(req, res));
	router.delete('/notes/delete/:id', (req, res) => controller.deleteUserNote(req, res));
}