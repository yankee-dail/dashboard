'use strict';

angular.module('uiQaninjasApp').directive("landingHeader", function () {
  return {
    restrict: 'E',
    templateUrl: 'shared/landing-header/landing-header.html',
    scope: true,
    transclude: false,
    replace: true,
    controller: 'LandingHeaderController'
  };
});
