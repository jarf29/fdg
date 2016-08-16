var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

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
    storeEmployeeId: {
        type: ObjectId,
        ref: 'user',
        required: true
    },
    openningDate: {
        type: Date,
        required: true
    },
    closingDate: {
        type: Date
    },    
    feedback: {
        type: Number,
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