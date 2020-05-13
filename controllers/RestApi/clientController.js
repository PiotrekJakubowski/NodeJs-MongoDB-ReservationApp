const db = require("../../models");
const clientModel = require('../../models/clientModel.js');
const Client = clientModel.Client;

exports.create_client = (req, res) => {
    console.log("Create client function start");
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

        res.send('Client Created successfully')
    })
};

exports.find_all_clients = (req, res) => {
    Client.find()
        .then(clients => {
            res.send(clients);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.find_by_client_id = (req, res) => {
    let clientId = req.params.clientId;
    Client.findById(clientId, function (err, result) {
        if (err) return next(err);

        res.send(result);
    })
};

exports.find_client_and_update = (req, res) => {
    let clientId = req.params.clientId;
    Client.findByIdAndUpdate(clientId, {
        $set: req.body
    }, function (err, client) {
        if (err) return next(err);
        res.send('Client with id: ' + clientId + ' updated.');
    });
};

exports.remove_all_client_reservations = (req, res) => {
    let clientId = req.params.clientId;
    let query = {
        client: clientId
    };

    Reservation.deleteMany(query, (err, reservations) => {
        if (err) throw err;
        console.log("Record(s) deleted successfully");
        console.log(reservations);
        res.send("Record(s) deleted successfully");
    })
};

exports.remove_client_by_id = (req, res) => {
    let clientId = req.params.clientId;

    Client.findByIdAndRemove(clientId, function (err) {
        if (err) return next(err);

        res.send('Deleted client and all reservations for clientid: ' + clientId + ' successfully!');
    })
};

exports.remove_all_clients = (req, res) => {
    
    Client.remove(function(err) {
        if (err) return next(err);

        res.send("All clients with reservations deleted");
    })

};