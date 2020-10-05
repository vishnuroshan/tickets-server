const ticketController = {};
const tickets = require('../models/tickets');
const shortid = require('shortid');

ticketController.list = () => new Promise((resolve, reject) => {
	tickets.getAllTickets().then(tickets => {
		return resolve(tickets);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

ticketController.getMyTickets = (userId) => new Promise((resolve, reject) => {
	tickets.getTicketsByAssignee(userId).then(tickets => {
		return resolve(tickets);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

ticketController.createTicket = (newTicket) => new Promise((resolve, reject) => {
	let ticketId = `ticket_${shortid.generate()}`;
	newTicket.ticketId = ticketId;
	tickets.create(newTicket).then(ticket => {
		return resolve(ticket);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

ticketController.edit = (ticketToEdit) => new Promise((resolve, reject) => {
	tickets.edit(ticketToEdit).then((edited) => {
		return resolve(edited);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});


ticketController.delete = (ticketId) => new Promise((resolve, reject) => {
	tickets.delete(ticketId).then((deleted) => {
		if (deleted)
			return resolve(deleted);
		else return resolve(false);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});


module.exports = ticketController;