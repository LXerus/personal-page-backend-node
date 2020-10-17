const configVars = {
    dbUri: process.env.DB_URI || "mongodb+srv://db_standard_user:ZbOjs7EV4zuNeKfN@cluster0.cttdc.mongodb.net/alexa-portfolio",
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0" || "http://localhost",
}

module.exports = configVars;