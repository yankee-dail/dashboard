'use strict';

angular.module('uiQaninjasApp')
  .directive('changePasswordTab', function() {
    return {
      restrict: 'A',
      templateUrl: 'shared/profile/change-password-tab.html',
      scope: true,
      transclude : false
    };
  });

