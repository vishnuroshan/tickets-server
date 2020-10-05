const sequelize = require('../../db/connection');
const Sequelize = require('sequelize');
const User = require('../user/userModel');
const Post = sequelize.define('Post', {
	postText: { type: Sequelize.STRING }
});

Post.belongsTo(User, { foreignKey: 'userId' });

module.exports = Post;