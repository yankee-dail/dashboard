'use strict';

angular.module('uiQaninjasApp')
  .controller('ServicesController', ['$scope', '$http', 'urls', '$location', 'appRoutes', 'ServiceFactory', 'Session',
    function ($scope, $http, urls, $location, appRoutes, ServiceFactory, Session) {
      $scope.isLoading = true;
      $http({
        url: urls.servicesUrl,
        method: 'GET',
        dataType: 'jsonp'
      }).then(function (response) {
        $scope.isLoading = false;
        $scope.services = response.data;
        console.log($scope.services);
      }, function (response) {
        $scope.isLoading = false;
        Session.destroy();
        $location.url(appRoutes.signIn);
      });
      $scope.openService = function (service) {
        ServiceFactory.setServiceId(service);
        $location.url(appRoutes.dashboard);
      };
    }]);
