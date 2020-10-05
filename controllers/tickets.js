const ticketController = {};
const Tickets = require('../models/tickets');
const Users = require('../models/user');
const shortid = require('shortid');
ticketController.list = (userId = null) => new Promise((resolve, reject) => {
	Tickets.getAllTickets(userId).then(tickets => {
		return resolve(tickets);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

ticketController.getMyTickets = (userId) => new Promise((resolve, reject) => {
	Tickets.getTicketsByAssignee(userId).then(tickets => {
		return resolve(tickets);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

ticketController.createTicket = (newTicket) => new Promise((resolve, reject) => {
	let ticketId = `ticket_${shortid.generate()}`;
	newTicket.ticketId = ticketId;
	Tickets.create(newTicket).then(ticket => {
		return resolve(ticket);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});

ticketController.edit = (ticketToEdit) => new Promise((resolve, reject) => {
	Tickets.edit(ticketToEdit).then((edited) => {
		return resolve(edited);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});


ticketController.delete = (ticketId) => new Promise((resolve, reject) => {
	Tickets.delete(ticketId).then((deleted) => {
		if (deleted)
			return resolve(deleted);
		else return resolve(false);
	}, err => {
		console.log(err);
		return reject({ status: 500, error: err });
	});
});


ticketController.adminInfo = () => new Promise((resolve, reject) => {
	Tickets.getAllTickets().then(async tickets => {
		let res = {};
		for (let ticket of tickets) {
			let user = await Users.findUserById(ticket.assignee);
			if (res[user.name] && res[user.name].tickets) {
				res[user.name].tickets = res[user.name].tickets + 1;
			}
			else {
				res[user.name] = {
					role: user.isAdmin,
					tickets: 1
				};
			}
		}
		return resolve(res);
	}, err => {
		console.log(err);
		return reject(err);
	});
});

module.exports = ticketController;