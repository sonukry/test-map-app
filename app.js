/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var apiPlace = require('./routes/apiPlace');
var apiNearby = require('./routes/apiNearby');
var apiGeofence = require('./routes/apiGeofence');

var mongoose = require('mongoose');
var cfg = require('./config.json');
mongoose.connect(cfg.mongo.url);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/api/places', apiPlace.get);
app.post('/api/places', apiPlace.post);
app.del('/api/places/:id', apiPlace.del);

app.get('/api/nearby/:id', apiNearby.get);

app.get('/api/geofences', apiGeofence.get);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});