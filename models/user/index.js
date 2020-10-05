const User = require('./userModel');

exports.createuser = (userDetails, transaction = null) =>
	User.create(userDetails, { transaction });

exports.findUser = (email, transaction = null) =>
	User.findOne({ where: { email }, transaction });

exports.findUserById = (userId, transaction = null) =>
	User.findOne({ where: { userId }, transaction });