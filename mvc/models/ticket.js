var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var TicketSchema = mongoose.Schema({
    ticketNumber: {
        type: Number, 
        required: true,
        unique: true,
        min: 1
    },
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    store_id: {
        type: ObjectId,
        ref: 'store'
    },
    storeEmployee_id: {
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

var Ticket = module.exports = mongoose.model('Ticket', TicketSchema);