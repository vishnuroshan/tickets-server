const Post = require('./postModel');

exports.getPosts = (userId, transaction = null) => Post.findAll({ where: { userId }, transaction });