var mongoose = require('mongoose');

var TicketSchema = mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: ObjectId,
        ref: 'ticketStatus',
        required: true
    },
    store: {
        type: ObjectId,
        ref: 'companyLocalStore'
    },
    openningDate: {
        type: Date,
        required: true
    },
    lastEmployeeId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    feedback: {
        type: Integer,
        min: 0,
        max: 5
    },
    tracking: [{
        employeeId: {
            type: String
        },
        employeeName:{
            type: String
        },
        status: {
            type: String
        },
        date: {
            type: Date
        },
        comments: {
            type: String
        }
    }]
});

var Ticket = module.exports = mongoose.model('Ticket', CompanySchema);