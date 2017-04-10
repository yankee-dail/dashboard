'use strict';

angular.module('uiQaninjasApp').directive("dashboardPieChart", function () {
  return {
    restrict: 'E',
    templateUrl: 'shared/dashboard-pie-chart/dashboard-pie-chart.html',
    scope: true,
    transclude: false
  };
});
