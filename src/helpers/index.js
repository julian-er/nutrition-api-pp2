/**
 * Gets an object without specific property
 * @param {object} obj The object base
 * @param {string} propertyName The property name to remove
 * @return {object}
 */
export function removeProperty(obj, propertyName) {
	let { [propertyName]: _, ...result } = obj;
	return result;
}

/**
 * Gets birth date on dateString and return age
 * @param {string} dateString The birth date
 * @return {number} age
 */
export function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

/**
 *  Gets birth date on dateString and return age
 * @param {string} dateString The birth date
 * @return {string} DD/MM/YYYY
 */
export function getDateFormat(dateString) {
	let date = new Date(dateString);
	let day = date.getDate();
	let month = date.getMonth() + 1;
	let year = date.getFullYear();

	return `${day}/${month}/${year}`;
}
