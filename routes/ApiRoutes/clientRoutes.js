module.exports = app => {
    const clientMethod = require("../../controllers/RestApi/clientController.js");
    
    var router = require("express").Router();

    router.get("/", clientMethod.find_all_clients);

    router.get("/:clientId", clientMethod.find_by_client_id);

    router.post("/", clientMethod.create_client);

    router.put("/:clientId", clientMethod.find_client_and_update);

    router.delete("/:clientId", clientMethod.remove_client_by_id);

    router.delete("/", clientMethod.remove_all_clients);

    app.use('/api/client', router);
};