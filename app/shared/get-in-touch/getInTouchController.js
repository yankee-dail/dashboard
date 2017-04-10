'use strict';

angular.module('uiQaninjasApp')
  .controller('GetInTouchController', ['$scope', '$http', 'urls', '$timeout',
    function ($scope, $http, urls, $timeout) {
      $scope.data = {};
      $scope.isGetInTouchLoading = false;

      $scope.submitGetInTouch = function () {
        if (this.getInTouchForm.name.$valid && this.getInTouchForm.email.$valid &&
          this.getInTouchForm.message.$valid) {
          var form = this.getInTouchForm;
          $scope.isGetInTouchLoading = true;
          $http({
            url: urls.sendGetInTouch,
            method: 'POST',
            data: $scope.data,
            dataType: 'jsonp'
          }).then(
            function successCallback(response) {
              if (response.data.status) {
                $scope.data = {};
                $scope.msg = response.data.msg;
                $scope.reset(form);
                $scope.isGetInTouchLoading = false;
                $timeout(function () {
                  $scope.msg = "";
                }, 5000);
                $scope.textAreaHeight = 30 + 'px';
              } else {
                $scope.error = response.data.msg;
                $scope.isLoading = false;
              }
            },
            function errorCallback() {
              $scope.error = "Something went wrong. Please try again later.";
              $timeout(function () {
                $scope.error = "";
              }, 5000);
              $scope.reset(form);
              $scope.isGetInTouchLoading = false;
            });
        }
      };

      // workaround for textarea
      $scope.$watch('data.message', function () {
        if ($scope.data.message === undefined) {
          $('#touchMessage').css({'height': '30px'});
        }
      });

      $scope.reset = function (form) {
        $scope.data.name = '';
        $scope.data.email = '';
        $scope.data.message = '';
        form.$setPristine();
        form.$setUntouched();
        form.$setValidity();
      }
    }]);
