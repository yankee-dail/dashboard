'use strict';

angular.module('uiQaninjasApp')
  .directive('activitiesTab', function() {
    return {
      restrict: 'A',
      templateUrl: 'shared/profile/activities-tab.html',
      scope: true,
      transclude : false
    };
  });

