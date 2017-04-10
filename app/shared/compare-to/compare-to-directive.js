'use strict';

angular.module('uiQaninjasApp')
  .directive("compareTo",
    function () {
      return {
        require: "ngModel",
        scope: {
          otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {
          ngModel.$validators.compareTo = function (modelValue) {
            ngModel.$modelValue = modelValue;
            return modelValue === scope.otherModelValue;
          };
          scope.$watch("otherModelValue", function () {
            ngModel.$validate();
          });
        }
      };
    });
