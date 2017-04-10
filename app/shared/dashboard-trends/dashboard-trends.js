'use strict';

angular.module('uiQaninjasApp').directive("dashboardTrends", function () {
  return {
    restrict: 'E',
    templateUrl: 'shared/dashboard-trends/dashboard-trends.html',
    scope: true,
    transclude: false
  };
});
