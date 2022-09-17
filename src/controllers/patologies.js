
import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';


export class PatologiesController extends BaseSQLController {
    /**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'patology', PluralEntityId ?? 'patologies');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'patologies';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'patology';
	}

    //#region Get Methods

	/**
	 * Gets all the Patologies
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getPatologies(_req, res) {
		const query = `SELECT * FROM patologies`;

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
	getPatologyById(req, res) {
		const query = `SELECT * FROM patology WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    async getPatologyByNameMethods(req, res) {
		const query = 'SELECT * FROM patologies WHERE patology_name= ?';
		const { patology_name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [patology_name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							message: 'Sorry we have an unexpected error trying fetch patology by name',
							error: user.sqlMessage
						})
					);
				}
			});
		});
    }


        /**
	    * Creates a Patology
	    * @param {Request} req The Express request
	    * @param {Response} res The Express response
	    */
	async createPatology(req, res) {
		const query = `INSERT INTO patologies ( patology_name, description) VALUES  (?, ?)`;
		const { patology_name, description } = req.body;
        const name = await this.getPatologyByNameMethods({ patology_name: patology_name }, res);
		if (name && name.length) {
			res.status(409).json({
				message: 'The patology already exists'
			});
		} else {
					this.create(
					query,
					[patology_name, description],
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
	editPatology(req, res) {
		const { id } = req.params;
		const { patology_name, description } = req.body;

		const query = `UPDATE patologies SET  patology_name = ?, description = ?  WHERE id = ?`;

		this.edit(
			query,
			[patology_name, description, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    /**
	 * Deletes a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deletePatology(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM patologies WHERE id = ?`;

		this.delete(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

}  




