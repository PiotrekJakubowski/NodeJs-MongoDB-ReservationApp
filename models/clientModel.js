const mongoose = require('mongoose');
const Reservation = require('./reservationModel.js');
const Court = require('./courtModel.js');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    reservation: [{ type: Schema.Types.ObjectId, ref: 'Reservation'}]
});

module.exports = mongoose.model('Client', ClientSchema);