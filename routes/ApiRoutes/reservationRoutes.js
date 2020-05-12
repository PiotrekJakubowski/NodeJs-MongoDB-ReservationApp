module.exports = app => {
    const reservationMethod = require("../../controllers/RestApi/reservationController.js");

    var router = require("express").Router();

    // router.post("/", clientMethod.create);

    router.get("/", reservationMethod.find_all);

    router.get("/client/:clientId", reservationMethod.find_by_client_id);

    router.post("/:clientId", reservationMethod.create_reservation_for_client);

    router.put("/:id", reservationMethod.reservation_update);

    router.delete("/:id", reservationMethod.remove_by_reservation_id);

    router.delete("/", reservationMethod.remove_all_reservations);

    router.delete("/clients/:clientId", reservationMethod.remove_all_client_reservations);

    app.use('/api/reservation', router);
};