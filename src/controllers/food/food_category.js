import { mysqlConnection } from '../../database.js';
import BaseSQLController from '../base-sql.js';

export class FoodCategoryController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'category', PluralEntityId ?? 'categories');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'categories';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'category';
	}

	//#region Get Methods
	/**
	 * Gets all food category
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getFoodCategories(_req, res) {
		const query = `SELECT * FROM food_category`;
		this.getAll(
			query,
			response =>
				res.status(200).json({
					success: true,
					message: response.message,
					httpStatusCode: 200,
					response: response
				}),
			error =>
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}

	/**
	 * Gets food category by id
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getFoodCategoryById(req, res) {
		const query = `SELECT * FROM food_category WHERE id = ? `;
		const { id } = req.params;

		this.getById(
			query,
			id,
			response =>
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: response
				}),
			error =>
				res.status(404).json({
					success: false,
					message: error.message,
					httpStatusCode: 404,
					response: error.error
				})
		);
	}

	async getFoodCategoryByNameMethod(req, res) {
		const query = 'SELECT * FROM food_category WHERE name= ?';
		const { name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							success: false,
							message: `Sorry ${this.SingularEntityId} with name: ${name} not found`,
							httpStatusCode: 404,
							response: error.sqlMessage
						})
					);
				}
			});
		});
	}

	async getFoodCategoryByName(req, res) {
		const { name } = req;
		const food = await this.getFoodCategoryByNameMethod(req, res);
		if (food) {
			if (food.length) {
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: food[0]
				});
			} else {
				res.status(404).json({
					success: false,
					message: `Sorry ${this.SingularEntityId} with name: ${name} not found`,
					httpStatusCode: 404,
					response: food
				});
			}
		}
	}

	//#endregion

	//#region POST methods

	/**
	 * Creates a food
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	async createCategoryFood(req, res) {
		const query = 'INSERT INTO food_category (name, description) VALUES(?, ?)';
		const { name, description } = req.body;
		const food_name = await this.getFoodCategoryByNameMethod({ name: name }, res);
		if (food_name && food_name.length) {
			res.status(409).json({
				success: false,
				message: 'The category name is already in use',
				httpStatusCode: 409,
				response: []
			});
		} else {
			this.create(
				query,
				[name, description],
				response =>
					res.status(200).json({
						success: true,
						message: response.message,
						httpStatusCode: 200,
						response: []
					}),
				error =>
					res.status(500).json({
						success: false,
						message: error.message,
						httpStatusCode: 500,
						response: error.error
					})
			);
		}
	}

	//#endregion

	//#region edit methods
	/**
	 * Edits a category
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	editCategory(req, res) {
		const { id } = req.params;
		const query = 'UPDATE food_category SET name = ?, description= ?  WHERE id = ?;';
		const { name, description } = req.body;
		this.edit(
			query,
			[name, description, id],
			response =>
				res.status(200).json({
					success: true,
					message: response.message,
					httpStatusCode: 200,
					response: []
				}),
			error =>
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}
	//#endregion

		//#region DELETE methods

	/**
	 * Deletes a category
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	 deleteCategory(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM food_category WHERE id = ?`;

		this.delete(
			query,
			id,
			response =>
				res.status(200).json({
					success: true,
					message: response.message,
					httpStatusCode: 200,
					response: []
				}),
			error =>
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}
	//#endregion
}
