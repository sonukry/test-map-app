var Place = require('../db/Place');

module.exports = {

  // post handler
  post: function (req, res) {
    var data = req.body.data;

    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    var place = new Place(data);

    place.save(function (err, doc) {
      if (err) {
        res.status(500);
      } else {
        res.json(201, doc);
      }

      res.end();
    });
  },


  // get handler
  get: function (req, res) {

    Place.find({}, {
      __v: 0
    }, function (err, docs) {
      if (err) {
        res.status(500);
      } else {
        res.json(200, docs);
      }

      res.end();
    });
  },


  // del handler
  del: function (req, res) {
    var id = req.params.id;

    Place.find({
      _id: id
    }).remove(function (err) {
      if (err) {
        res.status(500);
      } else {
        res.status(200);
      }

      res.end();
    });
  }
};