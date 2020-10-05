const Tickets = require('./ticketModel');

// exports.getTicketsByAssignee = (assignee, transaction = null) => Tickets.findAll({ where: { assignee }, transaction });

// exports.getTicketsByCreatedBy = (createdBy, transaction = null) => Tickets.findAll({ where: { createdBy }, transaction });

exports.getAllTickets = (assignee = null, transaction = null) => {
	return assignee ? Tickets.findAll({ where: { assignee, isActive: true }, transaction })
		: Tickets.findAll({ transaction });
};

exports.create = (newTicket, transaction = null) => Tickets.create(newTicket, { transaction });


exports.delete = (ticketId, transaction = null) => Tickets.update({
	isActive: false
}, {
	where: { ticketId },
	transaction,
	returning: true
});

exports.edit = (edits, transaction = null) => Tickets.update(edits,
	{
		where: {
			tiketId: edits.ticketId
		},
		transaction,
		returning: true
	});