'use strict';

angular.module('uiQaninjasApp').directive("dashboardLineChart", function () {
  return {
    restrict: 'E',
    templateUrl: 'shared/dashboard-line-chart/dashboard-line-chart.html',
    scope: true,
    transclude: false
  };
});
