'use strict';

angular.module('uiQaninjasApp').controller('FeedbackSectionCtrl', ['$scope', '$http', 'urls', '$mdDialog', '$mdMedia',
  'ThemeService',
  function ($scope, $http, urls, $mdDialog, $mdMedia, ThemeService) {
    $scope.data = {};
    $scope.showAdvanced = function (event) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'shared/feedback-section/feedback.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: $mdMedia('xs')
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.data = {};
      $scope.hide = function () {
        $mdDialog.hide();
      };
      $scope.cancel = function () {
        $mdDialog.cancel();
      };
      $scope.theme = ThemeService.getTheme();

      function getCheckboxValues($scope) {
        var checkboxes = ['cb1', 'cb2', 'cb3', 'cb4'], result = [];
        for (var i in checkboxes) {
          if ($scope.data.hasOwnProperty(checkboxes[i]) && $scope.data[checkboxes[i]]) {
            result.push($scope.data[checkboxes[i]])
          }
        }
        return result;
      }

      $scope.sendFeedback = function () {
        if (this.feedbackForm.email.$valid && this.feedbackForm.firstName.$valid &&
          this.feedbackForm.lastName.$valid && this.feedbackForm.comments.$valid && $scope.data) {
          $scope.data.about = getCheckboxValues($scope).join(', ');
          $scope.isLoading = true;
          $http({
            url: urls.sendFeedback,
            method: 'POST',
            data: $scope.data,
            dataType: 'jsonp'
          }).then(function (response) {
              $scope.isLoading = false;
              $scope.hide();
              console.log(response.data);
            },
            function (response) {
              $scope.error = response;
              console.log(response);
            });
        }
      };
    }
  }]);

