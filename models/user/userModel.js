const sequelize = require('../../db/connection');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');


const User = sequelize.define('user', {
	userId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	firstName: { type: Sequelize.STRING, allowNull: false },
	lastName: { type: Sequelize.STRING, allowNull: true },
	email: { type: Sequelize.STRING, allowNull: false, unique: true },
	password: { type: Sequelize.STRING }
}, {
	timestamps: true, hooks: {
		beforeCreate: async user => {
			try {
				if (user.password) {
					const hash = await bcrypt.hash(user.password, 10);
					user.password = hash;
				}
			} catch (err) {
				console.log(err);
			}

		}
	}
});

// expose user info only through this method
User.prototype.asJson = function () {
	return {
		fullName: `${this.firstName} ${this.lastName}`,
		firstName: this.firstName,
		lastName: this.lastName,
		email: this.email
	};
};
module.exports = User;