const sequelize = require('../../db/connection');
const Sequelize = require('sequelize');
const User = require('../user/userModel');

const Ticket = sequelize.define('Ticket', {
	ticketId: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	assignee: { type: Sequelize.STRING },
	createdBy: { type: Sequelize.STRING },
	desc: {
		type: Sequelize.STRING,
		allowNull: true
	},
	status: {
		type: Sequelize.ENUM,
		values: ['open', 'inprogress', 'closed', 'issue'],
		defaultValue: 'open'
	},
	priority: {
		type: Sequelize.ENUM,
		values: ['low', 'normal', 'high'],
		defaultValue: 'normal'
	},
	comments: {
		type: Sequelize.STRING,
		allowNull: true
	},
	isActive: { type: Sequelize.BOOLEAN, defaultValue: true }
}, { timestamps: true });

Ticket.belongsTo(User, {
	foreignKey: 'userId'
});

// User.hasMany(Ticket, { sourceKey: 'userId' });

module.exports = Ticket;