const authController = {};
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

authController.createUser = async (newUser) => new Promise((resolve, reject) => {
	User.createuser(newUser).then((user) => {
		return resolve({ status: 200, data: user.asJson() });
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

authController.login = async ({ email, password }) => new Promise((resolve, reject) => {
	User.findUser(email).then(async (user) => {
		try {
			console.log('1', email);
			const isAuth = await bcrypt.compare(password, user.password);
			if (isAuth) {
				const token = await jwt.generateJWT({ userId: user.userId, email });
				console.log('2', isAuth, token);
				return resolve({ status: 200, token });
			} else return resolve({ status: 400, message: 'invalid credentials' });
		} catch (err) {
			return reject({ status: 500, error: err });
		}
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

module.exports = authController;