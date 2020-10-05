const jwt = require('./jwt');
const User = require('../models/user');

exports.checkToken = (request, response, next) => {
	let token = request.headers.authorization;
	if (token) {
		if (token.startsWith('Bearer ')) token = token.slice(7, token.length);
		let paload = jwt.validateJWT(token);
		User.findUser(paload.email).then((user) => {
			request.user = user;
			next();
		});
	} else {
		// token not sent
		return response.status(401).json({ status: 401, message: 'unAuthorized' });
	}
};
