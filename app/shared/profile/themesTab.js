'use strict';

angular.module('uiQaninjasApp')
  .directive('themesTab', function () {
    return {
      restrict: 'A',
      templateUrl: 'shared/profile/themes-tab.html',
      scope: true,
      transclude: false
    };
  });
