const clientModel = require('../../models/clientModel.js');
const Client = clientModel.Client;

exports.create_reservation_for_client = (req, res) => {
    let clientId = req.params.clientId;
    let reservationArray = req.body.reservation;

    console.log(reservationArray);

    Client.findByIdAndUpdate(clientId, {
        $push: {
            reservation: reservationArray
        }
    }, function (err, result) {
        if (err) return next(err);


        res.send('Reservation for client added successfully');
    })
};

exports.find_all = (req, res) => {
    Client.find()
        .then(client => {
            res.send(client.reservation);
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
};

exports.reservation_update = function (req, res) {
    let reservationId = req.params.id;
    Reservation.findByIdAndUpdate(reservationId, {
        $set: req.body
    }, function (err, reservation) {
        if (err) return next(err);
        res.send('Reservation with id: ' + reservationId + ' updated.');
    });
};

exports.find_by_client_id = (req, res) => {
    console.log("Reservation find by Client ID method with param: " + req.params.clientId);
    Client.find({
            _id: req.params.clientId
        })
        .exec(function (err, reservation) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Reservation not found with given Client Id " + req.params.clientId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Reservations with given Client Id " + req.params.clientId
                });
            }

            res.send(reservation);
        });
};

exports.remove_all_reservations = (req, res) => {
    Reservation.remove(function (err) {
        if (err) return next(err);
        res.send('Deleted all reservations successfully!');
    })
};

exports.remove_by_reservation_id = (req, res) => {
    let reservationId = req.params.id;
    let clientId = req.params.clientId
    Client.findByIdAndUpdate(clientId, {
        "$pull": {
            "reservation": {
                "_id": reservationId
            }
        }
    }, function (err, result) {
        if (err) return next(err);
        res.send('Deleted reservation with id: ' + reservationId + ' successfully!');
    })
};

// ToDo:
// exports.remove_all_client_reservations = (req, res) => {
//     let clientId = req.params.clientId;

//     Client.findByIdAndUpdate(clientId, {
//         "$set": { "reservation": [] }
//     }, function(err, result) {
//         if (err) return next(err);
//         res.send('Deleted reservations with id: ' + reservationId + ' successfully!');
//     });
// };