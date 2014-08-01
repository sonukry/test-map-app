var Places = require('../db/Place');
var Geofences = require('../db/Geofence');

module.exports = {
  get: function (req, res) {
    var id = req.params.id;
    
    Geofences.findById(id, function(err, doc) {
      if(err) {
        res.status(500);
      } else { 
        var poly = doc.loc.coordinates[0];                
        var query = {
          loc: {
            $geoWithin: {
              $polygon: poly
            }
          }
        };
        
        Places.find(query, function(err, docs) {
          if(err) {
            res.status(500);
          } else {
            var payload = [];
            
            for(var i = 0, l = docs.length; i < l; i++) {
              payload.push({name: docs[i].name});
            }
            
            res.json(200, payload);
          }
          
          res.end();
        });
      }
    });
  }
};