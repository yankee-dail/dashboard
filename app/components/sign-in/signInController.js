'use strict';

angular.module('uiQaninjasApp')
  .controller('SignInController', ['$scope', '$http', 'AuthService', '$mdDialog', '$mdMedia', 'ThemeService',
    function ($scope, $http, AuthService, $mdDialog, $mdMedia, ThemeService) {
      ThemeService.setDefaultTheme();
      $scope.data = {};

      $scope.submitLoginForm = function () {
        if (this.loginForm.username.$valid && this.loginForm.password.$valid) {
          var form = this.loginForm;
          AuthService.login($scope.data);
          $scope.isLoading = function () {
            return $http.pendingRequests.length > 0;
          };
          $scope.$watch($scope.isLoading, function (value) {
            if (!value && !AuthService.isAuthenticated()) {
              $scope.isLoading = false;
              $scope.reset(form);
              $scope.error = AuthService.errorResponse().data.error_description;
            }
          });
        }
      };

      $scope.reset = function (form) {
        $scope.data.email = '';
        $scope.data.password = '';
        form.$setPristine();
        form.$setUntouched();
        form.$setValidity();
      };

      $scope.showSignUp = function (event) {
        event.preventDefault();
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'components/sign-in/sign-up.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose: true,
          fullscreen: $mdMedia('xs')
        });
      };

      function DialogController($scope, $mdDialog) {
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
      }
    }]);
