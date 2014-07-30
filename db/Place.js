var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var placeSchema = new mongoose.Schema({
  name: String,
  loc: GeoJSON.Point
});

placeSchema.index({
  loc: '2dsphere'
});

var Place = mongoose.model('Place', placeSchema);

module.exports = Place;