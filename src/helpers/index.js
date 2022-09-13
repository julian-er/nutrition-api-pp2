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
