const sequelize = require('../../db/connection');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
// const shortid = require('shortid');
// const Ticket = require('../tickets/ticketModel');

const User = sequelize.define('user', {
	userId: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	isAdmin: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		set(pass) {
			this.setDataValue('password', bcrypt.hashSync(pass));
		}
	},
	isVerified: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	status: {
		type: Sequelize.ENUM,
		values: ['active', 'inactive'],
		defaultValue: 'active'
	}
}, { timestamps: true });


// User.hasMany(Ticket, { sourceKey: 'assignee' });

// User.hasMany(Ticket, { sourceKey: 'createdBy' });

// expose user info only through this method
User.prototype.asJson = function () {
	return {
		userId: this.userId,
		name: this.name,
		email: this.email,
		isAdmin: this.isAdmin,
		status: this.status,
		isVerified: this.isVerified,
		createdAt: this.createdAt,
		updatedAt: this.updatedAt
	};
};
module.exports = User;