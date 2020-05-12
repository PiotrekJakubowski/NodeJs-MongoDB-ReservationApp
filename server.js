const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./models");

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require("./routes/ApiRoutes/clientRoutes")(app);
require("./routes/ApiRoutes/reservationRoutes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



