const Client = require('../models/clientModel.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    court: String,
    date: String,
    client: { type: Schema.Types.ObjectId, ref: 'Client'}
});

module.exports = mongoose.model('Reservation', ReservationSchema);