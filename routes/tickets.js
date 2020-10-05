const router = require('express').Router();
const { celebrate, Joi, errors } = require('celebrate');
const ticketController = require('../controllers/tickets');

router.get('/list', (request, response) => {
	ticketController.list(request.user.userId).then((posts) => {
		response.status(200).json({ status: 200, posts });
	}, err => {
		response.status(err.status).json(err);
	});
});

router.post('/create', celebrate({
	body: Joi.object().keys({
		title: Joi.string().required(),
		assignee: Joi.string().required(),
		desc: Joi.string().optional(),
		status: Joi.string().optional().allow('active').allow('inprogress').allow('closed').allow('issue'),
		priority: Joi.string().optional().allow('low').allow('normal').allow('high'),
		comments: Joi.string().optional(),
	})
}), errors(), (request, response) => {
	ticketController.createTicket(request.body).then((posts) => {
		response.status(200).json({ status: 200, posts });
	}, err => {
		response.status(err.status).json(err);
	});
});

module.exports = router;