import { Router } from 'express';
import { UserNotesController } from '../controllers/index.js';

/**
 * Sets the Notes routes
 * @param {Router} router
 */
export function setUserNotesRoutes(router) {
	const controller = new UserNotesController();

	router.get('/user_notes', (req, res) => controller.getUserNotes(req, res));
	router.post('/user_notes/create', (req, res) => controller.createUserNotes(req, res));
	router.put('/user_notes/:id', (req, res) => controller.editUserNote(req, res));
	router.delete('/user_notes/:id', (req, res) => controller.deleteUserNote(req, res));
}