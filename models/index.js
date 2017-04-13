var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");


module.exports.City = require("./traveledto.js");
module.exports.Country = require("./country.js");
