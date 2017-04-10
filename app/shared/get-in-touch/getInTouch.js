'use strict';

angular.module('uiQaninjasApp').directive("getInTouch", function () {
  return {
    restrict: 'E',
    templateUrl: 'shared/get-in-touch/get-in-touch.html',
    scope: true,
    transclude: false
  };
});
