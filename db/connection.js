/* eslint-disable no-undef */
const { Sequelize } = require('sequelize');
const instance = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASS, {
	host: process.env.DATABASE_HOST,
	dialect: 'postgres',
	logging: false
});

instance.sync();

module.exports = instance;