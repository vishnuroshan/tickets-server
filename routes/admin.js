const router = require('express').Router();
const ticketsController = require('../controllers/tickets');
const { celebrate, errors, Joi } = require('celebrate');

router.delete('/delete', celebrate({
	query: Joi.object().keys({
		ticketId: Joi.string().required()
	})
}), errors(), (request, response) => {
	console.log('sdadsadasdasdasd', request.query);
	if (request.user.isAdmin) {
		ticketsController.delete(request.query.ticketId).then((deleted) => {
			response.status(200).json({ status: 200, deleted });
		}, err => {
			response.status(err.status).json(err);
		});
	} else response.status(401).json({ status: 401, message: 'unAuthorized' });
});

router.get('/info', (request, response) => {
	if (request.user.isAdmin) {
		ticketsController.adminInfo().then((info) => {
			response.status(200).json({ status: 200, info });
		}, err => {
			response.status(err.status).json(err);
		});
	} else response.status(401).json({ status: 401, message: 'unAuthorized' });
});

module.exports = router;