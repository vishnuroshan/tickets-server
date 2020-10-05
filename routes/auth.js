const router = require('express').Router();
const authController = require('../controllers/auth');
const { celebrate, errors, Joi } = require('celebrate');

router.post('/sign-up', celebrate({
	body: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required()
		// .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { name: 'passwordRule' })
	})
}), errors(), (request, response) => {
	authController.createUser(request.body).then(result => {
		response.status(result.status).json(result);
	}, err => {
		response.status(err.status).json(err);
	});
});


router.post('/sign-in', celebrate({
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
}), errors(), (request, response) => {
	authController.login(request.body).then((result) => {
		response.status(result.status).json(result);
	}, err => {
		response.status(err.status).json(err);
	});
});

module.exports = router;