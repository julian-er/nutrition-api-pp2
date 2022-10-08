import { mysqlConnection } from '../../database.js';
import BaseSQLController from '../base-sql.js';

export class PathologiesController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'pathology', PluralEntityId ?? 'pathologies');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'pathologies';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'pathology';
	}

	//#region Get Methods

	/**
	 * Gets all the pathologies
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getPathologies(_req, res) {
		const query = `SELECT * FROM pathology`;

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
	 * Gets a Patolofy by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getPathologyById(req, res) {
		const query = `SELECT * FROM pathology WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

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
				res.status(500).json({
					success: false,
					message: error.message,
					httpStatusCode: 500,
					response: error.error
				})
		);
	}

	/**
	 * Gets an entry by name from any given entity
	 * @param {Request} req The Express request need to have a email
	 * @param {Response} res The Express response
	 */

	async getPathologyByNameMethod(req, res) {
		const query = 'SELECT * FROM pathology WHERE name= ?';
		const { name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							success: false,
							message: 'Sorry, we got an unexpected error trying to get the pathology by name',
							httpStatusCode: 500,
							response: error.sqlMessage
						})
					);
				}
			});
		});
	}

	async getPathologyByName(req, res) {
		const { name } = req;
		const pathology = await this.getPathologyByNameMethod(req, res);
		if (pathology) {
			if (pathology.length) {
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: pathology[0]
				});
			} else {
				res.status(404).json({
					success: false,
					message: `Sorry ${this.SingularEntityId} with name: ${name} not found`,
					httpStatusCode: 404,
					response: pathology
				});
			}
		}
	}
	//#endregion

	//#region Create Methods

	/**
	 * Creates a pathology
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	async createPathology(req, res) {
		const query = `INSERT INTO pathology ( name, description) VALUES  (?, ?)`;
		const { name, description } = req.body;
		const pathology = await this.getPathologyByNameMethod({ name: name }, res);
		if (pathology && pathology.length) {
			res.status(409).json({
				message: 'The pathology already exists'
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

	//#region EDIT methods

	/**
	 * Edits a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editPathology(req, res) {
		const { id } = req.params;
		const { name, description } = req.body;

		const query = `UPDATE pathology SET  name = ?, description = ?  WHERE id = ?`;

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

	//#region DELETE Methods

	/**
	 * Deletes a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deletePathology(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM pathology WHERE id = ?`;

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
}
