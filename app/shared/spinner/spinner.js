'use strict';

angular.module('uiQaninjasApp')
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('shared/spinner/spinner.html',
      '<md-progress-circular md-mode="indeterminate" md-diameter="100" ng-cloak></md-progress-circular>');
  }])
  .directive('spinner', ['$window', '$timeout', function($window, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'shared/spinner/spinner.html',
      scope: true,
      link: function (scope, element, attr) {
        var width,height;
        scope.parentSize = function() {
          width = attr.fullScreen ? '100%' : $(element).parent().width();
          height = attr.fullScreen ? '100%' : $(element).parent().height();
          $(element).css('width', width).css('height', height);
        };
        $timeout(scope.parentSize, 0);

        return angular.element($window).bind('resize', function() {
          scope.parentSize();
          return scope.$apply();
        });
      }
    };
  }]);
