var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TraveledtoSchema = new Schema({
    state: Boolean,
    cityName: String,
    month: String,
    year: Number,
    length: String,
    fun: Boolean
});

var Traveledto = mongoose.model('Traveleto', TraveledtoSchema);

module.exports = Traveledto;
