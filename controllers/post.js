const postController = {};
const Post = require('../models/post');
postController.list = (userId) => new Promise((resolve, reject) => {
	Post.getPosts(userId).then(posts => {
		return resolve(posts);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

module.exports = postController;