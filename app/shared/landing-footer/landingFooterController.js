'use strict';

angular.module('uiQaninjasApp').controller('LandingFooterController', ['$scope', 'romexsoft', function ($scope, romexsoft) {
  $scope.year = new Date().getFullYear();
  $scope.siteUrl = romexsoft.url;
  $scope.facebook = romexsoft.facebook;
  $scope.linkedIn = romexsoft.linkedIn;
  $scope.twitter = romexsoft.twitter;
  $scope.googlePlus = romexsoft.googlePlus;
}]);
