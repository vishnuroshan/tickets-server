const router = require('express').Router();
const postController = require('../controllers/post');

router.get('/list', (request, response) => {
	postController.list(request.user.userId).then((posts) => {
		response.status(200).json({ status: 200, posts });
	}, err => {
		response.status(err.status).json(err);
	});
});

module.exports = router;