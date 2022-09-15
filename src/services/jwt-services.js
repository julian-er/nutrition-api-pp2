import jwt from 'jsonwebtoken';
import { removeProperty } from '../helpers/index.js';

/**
 * Gets token with expire and log times
 * @param {object} payload The object for tokenize
 * @return {jwt}
 */
export function generateAccessToken(payload) {
	const cleanPayload = removeProperty(payload, 'password');
	return jwt.sign(cleanPayload,  process.env.TOKEN_SECRET, { expiresIn: '10800s' });
}
