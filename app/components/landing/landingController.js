'use strict';


angular.module('uiQaninjasApp')
  .controller('LandingController', ['$scope', '$http', 'urls', function ($scope, $http, urls) {
    $http({
      url: urls.servicesUrl,
      method: 'GET',
      dataType: 'jsonp'
    }).then(function (response) {
      $scope.services = response.data;
    }, function(response) {
      $scope.error = response;
    });
  }]);
