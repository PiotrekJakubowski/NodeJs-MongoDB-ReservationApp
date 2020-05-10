module.exports = app => {
    const clientReservation = require("../controllers/clientReservation.controller.js");

    var router = require("express").Router();

    router.post("/", clientReservation.create);

    router.get("/", clientReservation.findAll);

    router.get("/:id", clientReservation.findOne);

    router.put("/:id", clientReservation.update);

    router.delete("/:id", clientReservation.delete);

    router.delete("/", clientReservation.deleteAll);

    app.use('/api/clientReservation', router);
};