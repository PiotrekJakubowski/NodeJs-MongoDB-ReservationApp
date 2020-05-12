const db = require("../../models");
const Client = require("../../models/clientModel.js");
const Reservation = require("../../models/reservationModel.js");

exports.create_client = (req, res) => {
    let client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    });

    let reservationArray = req.body.reservation;

    console.log("Create client -> reservation length: " + reservationArray.length)

    client.save(function (err) {
        if (err) {
            return next(err);
        }

        for (var i = 0; i < reservationArray.length; i++) {
            //console.log("Reservation court: " + reservationArray[i].court);
            //console.log("Reservation date: " + reservationArray[i].date);

            let courtTemp = reservationArray[i].court;
            let dateTemp = reservationArray[i].date

            let reservation = new Reservation({
                court: courtTemp,
                date: dateTemp,
                client: client._id
            });

            reservation.save(function (err) {
                if (err) return console.error(err.stack)
                //console.log("Reservation is added")
            })
        };

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

        let query = {
            client: clientId
        }

        Reservation.deleteMany(query, (err, reservations) => {
            if (err) throw err;
        })

        res.send('Deleted client and all reservations for clientid: ' + clientId + ' successfully!');
    })
};

exports.remove_all_clients = (req, res) => {
    
    Client.remove(function(err) {
        if (err) return next(err);

        Reservation.remove(function(err) {
            if (err) throw err;
        })
        res.send("All clients with reservations deleted");
    })

};