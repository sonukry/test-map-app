var mongoose = require('mongoose');
var GeoJSON = require('mongoose-geojson-schema');

var geofenceSchema = new mongoose.Schema({
  name: String,
  loc: GeoJSON.Polygon
});

geofenceSchema.index({
  loc: '2dsphere'
});

var Geofence = mongoose.model('Geofence', geofenceSchema);

module.exports = Geofence;