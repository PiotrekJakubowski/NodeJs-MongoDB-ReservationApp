const db = require("../models");
const ClientReservation = db.clientsReservation;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    console.log("Req body: " + req.body);
    console.log("Req.body.reservation: " + req.body.reservation.court);

    const clientReservation = new ClientReservation({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        reservation: {
            court: req.body.reservation.court,
            date: req.body.reservation.date
        }
    });

    clientReservation
        .save(clientReservation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the ClientReservation."
            });
        });
};

exports.findAll = (req, res) => {
    const docId = req.query.id;
    var condition = docId ? {
        docId: {
            $regex: new RegExp(docId),
            $options: "i"
        }
    } : {};

    ClientReservation.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clientReservations."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    ClientReservation.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Not found ClientReservation with id " + id
                });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    message: "Error retrieving ClientReservation with id=" + id
                });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    ClientReservation.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update ClientReservation with id=${id}. Maybe ClientReservation was not found!`
                });
            } else res.send({
                message: "ClientReservation was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ClientReservation with id=" + id
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    ClientReservation.findByIdAndUpdate(id, req.body, {
            useFindAndModify: false
        })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update ClientReservation with id=${id}. Maybe ClientReservation was not found!`
                });
            } else res.send({
                message: "ClientReservation was updated successfully."
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ClientReservation with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    ClientReservation.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete ClientReservation with id=${id}. Maybe ClientReservation was not found!`
                });
            } else {
                res.send({
                    message: "ClientReservation was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete ClientReservation with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    ClientReservation.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} ClientReservation were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all clientReservations."
            });
        });
};