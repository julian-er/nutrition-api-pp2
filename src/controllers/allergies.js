
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

    //#region Get Methods

	/**
	 * Gets all the Allergies
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getAllergies(_req, res) {
		const query = `SELECT * FROM allergies`;

		this.getAll(
			query,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}


    /**
	 * Gets a Patolofy by ID
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	getAllergyById(req, res) {
		const query = `SELECT * FROM allergy WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    async getAllergyByNameMethods(req, res) {
		const query = 'SELECT * FROM allergies WHERE allergy_name= ?';
		const { allergy_name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [allergy_name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							message: 'Sorry we have an unexpected error trying fetch allergy by name',
							error: user.sqlMessage
						})
					);
				}
			});
		});
    }


        /**
	    * Creates a Allergy
	    * @param {Request} req The Express request
	    * @param {Response} res The Express response
	    */
	async createAllergy(req, res) {
		const query = `INSERT INTO allergies ( allergy_name, description) VALUES  (?, ?)`;
		const { allergy_name, description } = req.body;
        const name = await this.getAllergyByNameMethods({ allergy_name: allergy_name }, res);
		if (name && name.length) {
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

    	//#region EDIT methods

	/**
	 * Edits a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editAllergy(req, res) {
		const { id } = req.params;
		const { allergy_name, description } = req.body;

		const query = `UPDATE allergies SET  allergy_name = ?, description = ?  WHERE id = ?`;

		this.edit(
			query,
			[allergy_name, description, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    /**
	 * Deletes a users
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