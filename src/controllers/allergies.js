import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class AllergiesController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'allergy', PluralEntityId ?? 'allergies');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'allergies';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'allergy';
	}

	getAllergies(_req, res) {
		const query = `SELECT * FROM allergies`;
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

	getAllergyById(req, res) {
		const query = `SELECT * FROM allergies WHERE id = ? `;
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

	/**
	 * Gets an entry by name from any given entity
	 * @param {Request} req The Express request need to have a email
	 * @param {Response} res The Express response
	 */

	async getByAllergyNameMethod(req, res) {
		const query = 'SELECT * FROM allergies WHERE allergy_name = ?';
		const { allergy_name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [allergy_name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							success: false,
							message: 'Sorry we have an unexpected error trying fetch user by user name',
							httpStatusCode: 500,
							response: error.sqlMessage
						})
					);
				}
			});
		});
	}

	async getAllergyByName(req, res) {
		const { allergy_name } = req;
		const allergy = await this.getByAllergyNameMethod(req, res);
		if (allergy) {
			if (allergy.length) {
				res.status(200).json({
					success: true,
					message: '',
					httpStatusCode: 200,
					response: allergy[0]
				});
			} else {
				res.status(404).json({
					success: false,
					message: `Sorry ${this.SingularEntityId} with name: ${allergy_name} not found`,
					httpStatusCode: 404,
					response: allergy
				});
			}
		}
	}

	/**
	 * Creates an allergy
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	async createAllergy(req, res) {
		const query = `INSERT INTO allergies ( allergy_name, description) VALUES  (?, ?)`;
		const { allergy_name, description } = req.body;
		const allergyByAllergyName = await this.getByAllergyNameMethod({ allergy_name: allergy_name }, res);

		if (allergyByAllergyName && allergyByAllergyName.length) {
			res.status(409).json({
				success: false,
				message: 'The allergy name is already in use',
				httpStatusCode: 409,
				response: []
			});
		} else {
			this.create(
				query,
				[allergy_name, description],
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

	/**
	 * Edits an allergy
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	editAllergy(req, res) {
		const { id } = req.params;
		const query = 'UPDATE allergies SET allergy_name = ?, description= ? WHERE id = ?;';
		const { allergy_name, description } = req.body;
		this.edit(
			query,
			[allergy_name, description, id],
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

	/**
	 * Deletes an allergy
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */

	deleteAllergy(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM allergies WHERE id = ?`;

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
