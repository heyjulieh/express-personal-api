var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TraveledtoSchema = new Schema({
  state: String,
  cityName: String,
  length: Number,
});

var Traveledto = mongoose.model('Traveleto', TraveledtoSchema);

module.exports = Traveledto;
