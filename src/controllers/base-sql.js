import { mysqlConnection } from '../database.js';

/**
 * @typedef Success
 * @property {number} status The request status
 * @property {string} message The request message
 */

/**
 * @typedef Error
 * @property {number} status The error status
 * @property {string} message The error message
 * @property {string} error The SQL error
 */

export default class BaseSQLController {
	#entityId;

	/**
	 * @param {string} entityId The entity ID
	 */
	constructor(entityId) {
		this.#entityId = entityId;
	}

	/**
	 * Gets all entries from any given entity
	 * @param {string} query The SQL query
	 * @param {(response: any) => void} onSuccess The success callback
	 * @param {(error: Error) => void} onError The error callback
	 */
	get(query, onSuccess, onError) {
		mysqlConnection.query(query, (error, rows, _fields) => {
			if (!error) {
				onSuccess(rows);
			} else {
				onError({ message: 'Sorry we have an unexpected error', error: error.sqlMessage });
			}
		});
	}

	/**
	 * Gets an entry by ID from any given entity
	 * @param {string} query The SQL query
	 * @param {string} id The entity ID
	 * @param {(response: any) => void} onSuccess The success callback
	 * @param {(error: Error) => void} onError The error callback
	 */
	getById(query, id, onSuccess, onError) {
		mysqlConnection.query(query, [id], (error, rows, _fields) => {
			if (!error) {
				onSuccess(rows);
			} else {
				onError({ message: 'Sorry we have an unexpected error', error: error.sqlMessage });
			}
		});
	}

	/**
	 * Creates an entry
	 * @param {string} query The SQL query
	 * @param {Data[]} body The request body
	 * @param {(response: Success) => void} onSuccess The success callback
	 * @param {(error: Error) => void} onError The error callback
	 */
	create(query, body, onSuccess, onError) {
		mysqlConnection.query(query, body, (error, _rows, _fields) => {
			if (!error) {
				onSuccess({ message: `The ${this.#entityId} was created successfully` });
			} else {
				onError({ message: 'Sorry, we have an unexpected error', error: error.sqlMessage });
			}
		});
	}

	/**
	 * Edits an entry
	 * @param {string} query The SQL query
	 * @param {Data[]} body The request body
	 * @param {(response: Success) => void} onSuccess The success callback
	 * @param {(error: Error) => void} onError The error callback
	 */
	edit(query, body, onSuccess, onError) {
		mysqlConnection.query(query, body, (error, _rows, _fields) => {
			if (!error) {
				onSuccess({ message: `Your ${this.#entityId} was updated successfully` });
			} else {
				onError({ message: 'Sorry we have an unexpected error', error: error.sqlMessage });
			}
		});
	}

	/**
	 * Deletes an entry by ID from any given entity
	 * @param {string} query The SQL query
	 * @param {string} id The entity ID
	 * @param {(response: Success) => void} onSuccess The success callback
	 * @param {(error: Error) => void} onError The error callback
	 */
	delete(query, id, onSuccess, onError) {
		mysqlConnection.query(query, [id], (error, _rows, _fields) => {
			if (!error) {
				onSuccess({ message: `Your ${this.#entityId} was deleted successfully` });
			} else {
				onError({ message: 'Sorry we have an unexpected error', error: err.sqlMessage });
			}
		});
	}
}
