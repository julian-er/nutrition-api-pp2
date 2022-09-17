
import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';


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
		const query = `SELECT * FROM pathologies`;

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
	getPathologyById(req, res) {
		const query = `SELECT * FROM pathology WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    async getPathologyByNameMethods(req, res) {
		const query = 'SELECT * FROM pathologies WHERE pathology_name= ?';
		const { pathology_name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [pathology_name], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							message: 'Sorry we have an unexpected error trying fetch pathology by name',
							error: user.sqlMessage
						})
					);
				}
			});
		});
    }


        /**
	    * Creates a pathology
	    * @param {Request} req The Express request
	    * @param {Response} res The Express response
	    */
	async createPathology(req, res) {
		const query = `INSERT INTO pathologies ( pathology_name, description) VALUES  (?, ?)`;
		const { pathology_name, description } = req.body;
        const name = await this.getPathologyByNameMethods({ pathology_name: pathology_name }, res);
		if (name && name.length) {
			res.status(409).json({
				message: 'The pathology already exists'
			});
		} else {
					this.create(
					query,
					[pathology_name, description],
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
	editPathology(req, res) {
		const { id } = req.params;
		const { pathology_name, description } = req.body;

		const query = `UPDATE pathologies SET  pathology_name = ?, description = ?  WHERE id = ?`;

		this.edit(
			query,
			[pathology_name, description, id],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    /**
	 * Deletes a users
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deletePathology(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM pathologies WHERE id = ?`;

		this.delete(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

}  




