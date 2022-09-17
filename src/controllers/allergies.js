import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';

export class AllergiesController extends BaseSQLController {
	/**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'alergy', PluralEntityId ?? 'allergies');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'allergies';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'allergy';
	}

	getAllergies(_req, res) {
		const query = `SELECT * FROM allergies`;
		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
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
							message: 'Sorry we have an unexpected error trying fetch allergy name',
							error: user.sqlMessage
						})
					);
				}
			});
		});
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
				message: 'The allergy already exists'
			});
		} else {
			this.create(
				query,
				[allergy_name, description],
				response => res.status(200).json(response),
				error => res.status(500).json(error)
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
			response => res.status(200).json(response),
			error => res.status(500).json(error)
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
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}
}
