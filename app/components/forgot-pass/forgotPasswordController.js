'use strict';

angular.module('uiQaninjasApp').controller('ForgotPasswordController', ['$scope', '$http', 'urls', 'ResetPasswordService', function ($scope, $http, urls, ResetPasswordService) {
  $scope.data = {};
  $scope.error = !!ResetPasswordService.getErrors() ? ResetPasswordService.getErrors().msg : null;
  ResetPasswordService.setErrors({'msg': null});
  $scope.msg = null;

  $scope.sendForgotPass = function () {
    if (this.forgotForm.email.$valid) {
      var form = this.forgotForm;
      $scope.isLoading = true;
      $http({
        url: urls.sendForgotPass,
        method: 'POST',
        data: $scope.data,
        dataType: 'jsonp'
      }).then(
        function successCallback(response) {
          if (response.data.data.result) {
            $scope.data = {};
            $scope.msg = response.data.data.msg;
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
          console.log(response.data);
        });
    }
  };
  $scope.reset = function(form) {
    form.email = '';
    form.$setPristine();
    form.$setUntouched();
    form.$setValidity();
  }
}]);
