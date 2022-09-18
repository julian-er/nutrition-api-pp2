import { mysqlConnection } from '../database.js';
import BaseSQLController from './base-sql.js';


export class DietsController extends BaseSQLController {
    /**
	 * @param {string} SingularEntityId The entity ID
	 * @param {string} PluralEntityId The entity ID
	 */
	constructor(SingularEntityId, PluralEntityId) {
		super(SingularEntityId ?? 'diet', PluralEntityId ?? 'diets');
		this.PluralEntityId = PluralEntityId ? PluralEntityId : 'diets';
		this.SingularEntityId = SingularEntityId ? SingularEntityId : 'diet';
    }

     //#region Get Methods

	/**
	 * Gets all Diets
	 * @param {Request} _req The Express request
	 * @param {Response} res The Express response
	 */
	getDiets(_req, res) {
		const query = `SELECT * FROM diets`;

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
	getDietsById(req, res) {
		const query = `SELECT * FROM diets WHERE id = ? `;
		const { id } = req.params; // Also you can use this other notation req.params.id to see the param

		this.getById(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    /**
	 * Gets an entry by name from any given entity
	 * @param {Request} req The Express request need to have a email
	 * @param {Response} res The Express response
	 */

    async getDietsByNameMethods(req, res) {
		const query = 'SELECT * FROM diets WHERE diet_name= ?';
		const { diet_name } = req;

		return new Promise((resolve, reject) => {
			mysqlConnection.query(query, [ diet_name ], (error, rows, _fields) => {
				if (!error) {
					resolve(rows);
				} else {
					reject(
						res.status(500).json({
							message: 'Sorry we have an unexpected error trying fetch diet by name',
							error: user.sqlMessage
						})
					);
				}
			});
		});
    }

    /**
	* Creates a Diet
	* @param {Request} req The Express request
	* @param {Response} res The Express response
	*/
	async createDiets(req, res) {
		const query = `INSERT INTO diets ( diet_name ) VALUES  ( ? )`;
		const { diet_name } = req.body;
        const name = await this.getDietsByNameMethods({ diet_name: diet_name }, res);
	
				this.create(
				query,
				[ diet_name ],
				response => res.status(200).json(response),
				rror => res.status(500).json(error)
			);
    }

    //#region EDIT methods

	/**
	 * Edits a Diet
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	editDiets(req, res) {
		const { id } = req.params;
		const { diet_name } = req.body;

		const query = `UPDATE diets SET  diet_name = ?  WHERE id = ?`;

		this.edit(
			query,
			[ diet_name, id ],
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    /**
	 * Deletes a Diet
	 * @param {Request} req The Express request
	 * @param {Response} res The Express response
	 */
	deleteDiets(req, res) {
		const { id } = req.params;
		const query = `DELETE FROM diets WHERE id = ?`;

		this.delete(
			query,
			id,
			response => res.status(200).json(response),
			error => res.status(500).json(error)
		);
	}

    



}