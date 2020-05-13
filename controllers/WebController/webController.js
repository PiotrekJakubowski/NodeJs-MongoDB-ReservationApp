'use strict';
console.log("webClientController.js file start");

var clientModel = require('../../models/clientModel');
const Client = clientModel.Client;

exports.list_clients = function (req, res) {

    Client.find({}, function (err, result) {
        if (err)
            return err;

        res.render('clientView.ejs', {
            client: result
        });
    });
};

exports.find_by_client_reservations = (req, res) => {
    let clientId = req.params.clientId;

    Client.findById(clientId, function (err, result) {
        if (err) return next(err);

        res.render('reservationView.ejs', {
            reservation: result.reservation,
            client: result
        });
    })
};

exports.add_client_page = (req, res) => {
    res.render('add-client.ejs', {
        message: ''
    });
};

exports.add_client = (req, res) => {
    console.log("Create web client function start");
    let client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        reservation: req.body.reservation
    });

    client.save(function (err) {
        if (err) {
            console.log("First error");
            return next(err);
        }

        res.redirect('/web/clients');
    })
};

exports.edit_client_page = function (req, res) {
    let clientId = req.params.clientId;
    console.log("WebController - edit_client: " + clientId);

    Client.findById(clientId, function (err, client) {
        if (err)
            return next(err);

        res.render('edit-client.ejs', {
            client: client
        });
    });
};

exports.edit_client = function (req, res) {

    let clientId = req.params.clientId;

    Client.findByIdAndUpdate(clientId, {
        $set: req.body
    }, function (err, client) {
        if (err) return next(err);
        res.redirect('/web/clients');
    });
};

exports.delete_client = function (req, res) {

    let clientId = req.params.clientId;

    Client.findByIdAndDelete(clientId, function (err, result) {
        if (err) return next(err);
        res.redirect('/web/clients');
    });
};

exports.add_reservation_page = function (req, res) {
    let clientId = req.params.clientId;
    res.render('add-reservation.ejs', {
        clientId: clientId
    });
};

exports.add_reservation_for_client = function (req, res) {
    let reservation = {
        court: req.body.court,
        date: req.body.date
    }

    let clientId = req.body.client_id;

    console.log("List reservations for client with id: " + clientId);

    Client.findByIdAndUpdate(clientId, {
        $push: {
            reservation: reservation
        }
    }, function (err, client) {
        if (err)
            return next(err);

        res.redirect('/web/clientReservations/' + clientId);
    });
};

exports.edit_reservation_page = function (req, res) {

    let reservationId = req.params.reservationId;
    console.log("Search via reservation id: " + reservationId);

    Client.findOne({
        'reservation._id': reservationId
    }, function (err, client) {
        if (err)
            return next(err);

        let reservationArray = client.reservation;
        let filterArr =  reservationArray.filter(function (e) {
            return e._id == reservationId
        });

        console.log(filterArr[0].court);

        res.render('edit-reservation.ejs', {
            reservationCourt: filterArr[0].court,
            reservationDate: filterArr[0].date
        });
        
    });
};

exports.edit_reservation = function (req, res) {

    let reservationId = req.params.reservationId;

    let reservation = {
        court: req.body.court,
        date: req.body.date
    }

    Client.update(
        {'reservation._id':  reservationId},
        {  $set: { 'reservation.$.court': reservation.court,
                    'reservation.$.date': reservation.date }},
        function(err, result) {
            if (err)
                return next(err);

            res.redirect('/web/clients');
        })

};

exports.remove_by_reservation_id = (req, res) => {
    let reservationId = req.params.reservationId;

    Client.update(
        {'reservation._id': reservationId },
        {"$pull": {
            "reservation": {
                "_id": reservationId
            }
        }
    }, function (err, result) {
        if (err) return next(err);
        
        res.redirect('/web/clients');
    })
};