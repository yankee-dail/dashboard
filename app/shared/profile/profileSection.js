'use strict';

angular.module('uiQaninjasApp')
  .directive('profileSection', function () {
    return {
      restrict: 'A',
      templateUrl: 'shared/profile/profile-section.html',
      scope: true,
      transclude: false
    };
  });
