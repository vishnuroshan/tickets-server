const authController = {};
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const shortid = require('shortid');

authController.createUser = async (newUser) => new Promise((resolve, reject) => {
	let userId = `user_${shortid.generate()}`;
	newUser.userId = userId;
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
			const isAuth = await bcrypt.compare(password, user.password);
			console.log(isAuth);
			if (isAuth) {
				const token = jwt.generateJWT({ userId: user.userId, email });
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