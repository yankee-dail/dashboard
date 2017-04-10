'use strict';

angular.module('uiQaninjasApp').controller('SidebarMenuController', ['$scope', 'UserDataService', '$location',
  'appRoutes', 'Session', function ($scope) {
    $scope.isCollapsed = true;

    $scope.toggleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    }
  }]);
