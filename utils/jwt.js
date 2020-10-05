const jsonwebtoken = {};
const jwt = require('jsonwebtoken');
const config = require('../config/app-config');

const jwtHead = {
	algorithm: 'HS256',
	expiresIn: '7d'
};

jsonwebtoken.generateJWT = (payload) => new Promise((resolve, reject) => {
	try {
		let token = jwt.sign(payload, config.KEY, jwtHead);
		return resolve(token);
	} catch (err) {
		return reject(err);
	}
});


jsonwebtoken.validateJWT = (token) => new Promise((resolve, reject) => {
	try {
		const payload = jwt.verify(token, config.KEY);
		return resolve(payload);
	} catch (err) {
		return reject(err);
	}
});

module.exports = jsonwebtoken;
