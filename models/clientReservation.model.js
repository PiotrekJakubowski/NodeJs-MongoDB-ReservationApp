module.exports = mongoose => {
    const ClientReservation = mongoose.model(
        "clientReservation",
        mongoose.Schema({
            firstName: String,
            lastName: String,
            email: String,
            phoneNumber: String,
            reservation: {
                court: String,
                date: String
            }
        }, {
            timestamps: true
        })
    );

    return ClientReservation;
};