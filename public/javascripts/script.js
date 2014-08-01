;
(function (angular, _) {
  'use strict';

  var app = angular.module('myApp', ['google-maps', 'ngResource']);

  // route config
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/markerList.html',
        controller: 'MarkerListCtrl'
      })
      .when('/geofences', {
        templateUrl: '/views/geofence.html',
        controller: 'GeofenceCtrl'
      });
  });

  // factory for Places
  app.factory('Places', function ($http) {
    var url = '/api/places';

    return {
      getNearby: function (id) {
        return $http.get('/api/nearby/' + id);
      },
      get: function () {
        return $http.get(url);
      },
      post: function (data) {
        return $http.post(url, data);
      },
      del: function (id) {
        return $http.delete(url + '/' + id);
      }
    };
  });

  // factory for Geofences
  app.factory('Geofences', function ($http) {
    var url = '/api/geofences';

    return {
      get: function () {
        return $http.get(url);
      },
      post: function (data) {
        return $http.post(url, data);
      },
      del: function (id) {
        return $http.delete(url + '/' + id);
      }
    };
  });

  app.controller('MainCtrl', function ($scope, Places, Geofences) {
    Places
      .get()
      .success(function (docs) {
        $scope.markers = docs;
      });

    Geofences
      .get()
      .success(function (docs) {
        $scope.geofences = docs;
      });
  });

  // map controller
  app.controller('MapCtrl', function ($scope, Places) {

    $scope.poly = {
      stroke: {
        color: '#6060FB',
        weight: 3
      },
      fill: {
        color: 'skyblue',
        opacity: 0.8
      },
      clickable: true
    };

    $scope.map = {
      center: {
        latitude: 13,
        longitude: 80
      },
      zoom: 9,
      events: {
        click: function (map, evt, args) {
          var latLng = args[0].latLng;

          var lat = Number(latLng.lat());
          var lng = Number(latLng.lng());

          var payload = {
            name: prompt('Enter place name'),
            loc: {
              type: 'Point',
              coordinates: [lng, lat]
            }
          };

          Places
            .post({
              data: payload
            })
            .success(function (doc) {
              console.log('POST SUC:', doc);
              $scope.$parent.markers.push(doc);
            })
            .error(function () {
              console.log('POST ERR:', payload);
            });
        }
      }
    };
  });

  app.controller('GeofenceCtrl', function ($scope) {});

  // markerList controller 
  app.controller('MarkerListCtrl', function ($scope, Places) {

    // to remove a marker
    $scope.removeMarker = function (evt) {
      var id = evt.target.attributes.id.value;

      Places
        .del(id)
        .success(function () {
          console.log('DEL SUC:', id);

          $scope.$parent.markers = _.reject($scope.$parent.markers, function (m) {
            return m._id == id;
          });
        })
        .error(function () {
          console.log('DEL ERR:', id);
        });
    };

    // to get nearby place
    $scope.getNearby = function (evt) {
      var id = evt.target.attributes.id.value;

      Places
        .getNearby(id)
        .success(function (data) {
          alert(data.name + ' at ' + Math.round(data.dis * 100) / 100 + ' km');
        });
    };

  });

}(window.angular, window._));