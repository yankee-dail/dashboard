'use strict';

angular.module('uiQaninjasApp')
  .directive('personalInfoTab', function () {
    return {
      restrict: 'A',
      templateUrl: 'shared/profile/personal-info-tab.html',
      scope: true,
      transclude: false
    };
  });
