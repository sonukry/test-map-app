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
  },
  post: function (req, res) {
    var data = req.body.data;

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    var geofence = new Geofence(data);

    geofence.save(function (err, doc) {
      if (err) {
        res.status(500);
      } else {
        res.json(201, doc);
      }

      res.end();
    });
  }
};