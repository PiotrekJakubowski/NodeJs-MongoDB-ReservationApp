'use strict';
module.exports = function (app) {
    const webMethod = require("../../controllers/WebController/webController.js");
    
    //Client
    app.route('/web/clients')
        .get(webMethod.list_clients);

    app.route('/web/addClient')
        .get(webMethod.add_client_page)
        .post(webMethod.add_client);

    app.route('/web/deleteClient/:clientId')
        .get(webMethod.delete_client);

    app.route('/web/editClient/:clientId')
        .get(webMethod.edit_client_page)
        .post(webMethod.edit_client);

    // app.route('/web/deleteAll')
    //     .get(webClientMethod.delete_all_clients);

    //Reservation
    app.route('/web/clientReservations/:clientId')
        .get(webMethod.find_by_client_reservations);

    app.route('/web/addReservation/:clientId')
        .get(webMethod.add_reservation_page)
        .post(webMethod.add_reservation_for_client);

    app.route('/web/editReservation/:reservationId')
        .get(webMethod.edit_reservation_page)
        .post(webMethod.edit_reservation);

     app.route('/web/deleteReservation/:reservationId')
         .get(webMethod.remove_by_reservation_id);
};