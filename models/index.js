const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.clientModel = require("./clientModel.js")(mongoose);
db.reservationModel = require("./reservationModel")(mongoose);

module.exports = db;
