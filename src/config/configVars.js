const configVars = {
    dbUri: process.env.DB_URI,
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0" || "http://localhost",
}

module.exports = configVars;