var Geofence = require('../db/Geofence');

module.exports = {
  get: function (req, res) {
    Geofence.find({}, function (err, docs) {
      if (err) {
        res.status(500);
      } else {
        res.json(200, docs);
      }

      res.end();
    });
  }
};