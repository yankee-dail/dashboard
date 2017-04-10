'use strict';

angular.module('uiQaninjasApp')
  .controller('ResetPasswordController', ['$scope', '$location', '$http', 'urls', 'appRoutes', function ($scope, $location, $http, urls, appRoutes) {
    $scope.error = null;
    $scope.msg = null;

    $scope.data = {
      password: '',
      confirmPassword: '',
      u: $location.search().u
    };

    $scope.submitResetForm = function () {
      if (this.resetForm.password.$valid && this.resetForm.confirmPassword.$valid && this.resetForm.password.$modelValue === this.resetForm.confirmPassword.$modelValue) {
        $scope.error = "";
        var form = this.resetForm;
        $scope.isLoading = true;
        $http({
          url: urls.changePass,
          method: 'POST',
          data: $scope.data
        }).then(
          function successCallback(response) {
            if (response.data.data.result) {
              $scope.msg = response.data.data.msg;
              $scope.data = null;
              $scope.isLoading = false;
              $scope.reset(form);
            } else {
              $scope.error = response.data.data.msg;
              $scope.isLoading = false;
            }
          },
          function errorCallback(response) {
            $scope.error = "Something went wrong. Please try again later.";
            $scope.isLoading = false;
            $scope.reset(form);
          });
      }
    };
    $scope.reset = function(form) {
      form.password = '';
      form.confirmPassword = '';
      form.$setPristine();
      form.$setUntouched();
      form.$setValidity();
    }
  }]);
