var Place = require('../db/Place');

module.exports = {
  get: function(req, res) {
    var id = req.params.id;
    
    Place.findById(id, function(err, doc) {
      if(err) {
        res.status(500);
      } else { 
        var point = doc.loc;        
        var opts = {
          spherical: true,
          distanceMultiplier: 6371
        };
        
        
        Place.geoNear(point, opts, function(err, doc) {
          if(err) {
            res.status(500);
          } else {
                        
            res.json(200, {
              dis: doc[1].dis,
              name: doc[1].obj.name,
              loc: doc[1].obj.loc
            });
          }
          
          res.end();
        });
      }
    });
  }
};