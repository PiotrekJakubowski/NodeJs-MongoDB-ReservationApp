const Client = require('../../models/clientModel.js');
const Reservation = require('../../models/reservationModel.js');

exports.create_reservation_for_client = (req, res) => {
    let clientId = req.params.clientId;
    let reservationArray = req.body.reservation;

    console.log(reservationArray);

    Client.findById(clientId, function (err, result) {
        if (err) return next(err);

        var client = result;

        client.save(function (err) {
            if (err) {
                return next(err);
            }

            for (var i = 0; i < reservationArray.length; i++) {

                let courtTemp = reservationArray[i].court;
                let dateTemp = reservationArray[i].date

                let reservation = new Reservation({
                    court: courtTemp,
                    date: dateTemp,
                    client: client._id
                });

                reservation.save(function (err) {
                    if (err) return console.error(err.stack)
                })
            };

            res.send('Reservation for client created successfully');
        })
    })
};

exports.find_all = (req, res) => {
    Reservation.find()
        .then(reservations => {
            res.send(reservations);
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
    Reservation.find({
            client: req.params.clientId
        })
        .exec(function (err, reservations) {
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

            res.send(reservations);
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
    Reservation.findByIdAndRemove(reservationId, function (err) {
        if (err) return next(err);
        res.send('Deleted reservation with id: ' + reservationId + ' successfully!');
    })
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