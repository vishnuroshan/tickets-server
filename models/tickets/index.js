const Tickets = require('./ticketModel');

exports.getTicketsByAssignee = (assignee, transaction = null) => Tickets.findAll({ where: { assignee }, transaction });

// exports.getTicketsByCreatedBy = (createdBy, transaction = null) => Tickets.findAll({ where: { createdBy }, transaction });

exports.getAllTickets = (transaction = null) => Tickets.findAll({ transaction });

exports.create = (newTicket, transaction = null) => Tickets.create(newTicket, { transaction });


exports.delete = (ticketId, transaction = null) => Tickets.update({ isActive: false }, { where: { ticketId }, transaction, returning: true });