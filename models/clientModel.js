const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    reservation: [{
        court: String,
        date: String
    }]
});


const clientSchema = mongoose.model('Client', ClientSchema);

module.exports = {
    Client: clientSchema,
}