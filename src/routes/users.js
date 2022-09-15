import { Router } from 'express';
import { UsersController } from '../controllers/index.js';

/**
 * Sets the Users routes
 * @param {Router} router
 */
export function setUserRoutes(router) {
	const controller = new UsersController();

	router.get('/users', (req, res) => controller.getUsers(req, res));
	router.get('/users/:id', (req, res) => controller.getUserById(req, res));
	router.get('/users/user/:user_name', (req, res) => controller.getUserByUserName({user_name : req.params.user_name}, res));
	router.post('/users/create', (req, res) => controller.createUser(req, res));
	router.put('/users/:id', (req, res) => controller.editUser(req, res));
	router.put('/users/update-user/:id', (req, res) => controller.changeUserName(req, res));
	router.put('/users/update-mail/:id', (req, res) => controller.changeMail(req, res));
	router.put('/users/update-password/:id', (req, res) => controller.changePassword(req, res));
	router.delete('/users/:id', (req, res) => controller.deleteUser(req, res));
}
