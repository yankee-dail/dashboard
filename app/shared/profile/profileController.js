'use strict';

angular.module('uiQaninjasApp')
  .controller('ProfileController', ['$scope', '$http', 'AuthService', 'PersonalInfoService', 'urls', 'Session',
    '$location', 'appRoutes', '$timeout', 'themes', 'ThemeService',
    function ($scope, $http, AuthService, PersonalInfoService, urls, Session, $location, appRoutes, $timeout,
              themes, ThemeService) {
      $scope.isLoading = true;

      var personalInfo = PersonalInfoService.getData();
      personalInfo.then(function success(data) {
        $scope.user = {
          'firstName': data.msg.first_name,
          'lastName': data.msg.last_name,
          'projects': data.msg.projects,
          'releases': data.msg.releases,
          'services': data.msg.services
        };
        $scope.personalInfo = {
          'id': data.msg.id,
          'firstName': data.msg.first_name,
          'lastName': data.msg.last_name,
          'email': data.msg.email,
          'msg': {}
        };
        $scope.userTheme = data.msg.theme;
        $scope.themes = themes;
        $scope.themesData = {
          'themeValue': $scope.userTheme
        };
        $scope.$watch('themesData.themeValue', function() {
          ThemeService.setTheme($scope.themesData.themeValue);
        });
        $scope.isLoading = false;
      }, function error() {
        Session.destroy();
        $location.url(appRoutes.signIn);
      });

      $scope.submitUserForm = function () {
        if (this.userProfileForm.firstName.$valid && this.userProfileForm.lastName.$valid &&
          this.userProfileForm.email.$valid) {
          $scope.isUserLoading = true;
          return $http({
              url: urls.usersRest + $scope.personalInfo.id + '/',
              method: 'PUT',
              data: $scope.personalInfo
            }
          ).then(function success() {
            var user = AuthService.getLoggedUser();
            user.id = $scope.personalInfo.id;
            user.first_name = $scope.personalInfo.firstName;
            user.last_name = $scope.personalInfo.lastName;
            user.email = $scope.personalInfo.email;
            AuthService.updateLoggedUser(user);
            $scope.personalInfo.msg = {
              message: 'Personal info is updated!',
              success: true
            };
            $scope.isUserLoading = false;
            $timeout(function () {
              $scope.personalInfo.msg = {};
            }, 5000);
          }, function error(res) {
            $scope.personalInfo.msg = {
              message: res.data.errors,
              error: true
            };
            $scope.isUserLoading = false;
            $timeout(function () {
              $scope.personalInfo.msg = {};
            }, 5000);
          });
        }
      };

      $scope.changePassData = {};
      $scope.changePassFormScope = {};
      $scope.setChangePassFormScope = function(scope) {
        $scope.changePassFormScope = scope;
      };
      $scope.submitChangePassForm = function () {
        $scope.errors = null;
        if (this.changePassForm.oldPassword.$valid && this.changePassForm.newPassword.$valid &&
          this.changePassForm.confirmPassword.$valid) {
          $scope.isPassLoading = true;
          var changePassForm = this.changePassForm;
          $scope.error = "";
          return $http({
              url: urls.updatePassword,
              method: 'POST',
              data: {
                'old_password': $scope.changePassData.oldPassword,
                'new_password1': $scope.changePassData.newPassword,
                'new_password2': $scope.changePassData.confirmPassword
              },
              dataType: 'jsonp'
            }
          ).then(function (res) {
            $scope.changePassData.msg = {
              message: res.data.msg,
              success: true
            };
            $scope.resetPassword(changePassForm);
            $scope.isPassLoading = false;
            $timeout(function () {
              $scope.changePassData.msg = {};
            }, 5000);
          }, function (res) {
            $scope.changePassData.msg = {
              message: res.data.msg.password_incorrect,
              error: true
            };
            $scope.resetPassword(changePassForm);
            $scope.isPassLoading = false;
            $timeout(function () {
              $scope.changePassData.msg = {};
            }, 5000);
          });
        }
      };

      $scope.resetPassword = function (form) {
        $scope.changePassData.oldPassword = '';
        $scope.changePassData.newPassword = '';
        $scope.changePassData.confirmPassword = '';
        if (form) {
          form.$setPristine();
          form.$setUntouched();
          form.$setValidity();
        }
      };

      $scope.submitThemeForm = function() {
        $scope.isThemesLoading = true;
        var themePromise = PersonalInfoService.updateTheme({
          'theme': $scope.themesData.themeValue
        });
        themePromise.then(function success() {
          $scope.userTheme = $scope.themesData.themeValue;
          $scope.themesData.msg = {
            message: 'Theme is changed!',
            success: true
          };
          var user = AuthService.getLoggedUser();
          user.theme = $scope.userTheme;
          AuthService.updateLoggedUser(user);
          $scope.isThemesLoading = false;
          $timeout(function () {
            $scope.themesData.msg = {};
          }, 5000);
        }, function error(response) {
          $scope.themesData.msg = {
            message: response.data.errors,
            error: true
          };
          $scope.isThemesLoading = false;
          $timeout(function () {
            $scope.themesData.msg = {};
          }, 5000);

        });
      };
      $scope.cancelTheme = function() {
        ThemeService.setTheme($scope.userTheme);
        $scope.themesData.themeValue = $scope.userTheme;
      };
    }])
  .controller('ProfileTabsController', ['$scope', function ($scope) {
    var self = this;
    $scope.$watch(
      function watch() {
        return self.selectedIndex;
      },
      function watchAction() {
        $scope.resetPassword($scope.changePassFormScope.changePassForm);
        $scope.cancelTheme();
      }
    );
  }])
  .service('PersonalInfoService', ['$http', '$q', 'urls', function ($http, $q, urls) {
    return {
      getData: function () {
        var deferred = $q.defer();
        $http.get(urls.personalInfo).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;
      },
      updateUser: function (json) {
        var deferred = $q.defer();
        $http({
          url: '',
          method: 'POST',
          data: json,
          dataType: 'jsonp'
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;
      },
      updateTheme: function(json) {
        var deferred = $q.defer();
        $http({
          url: urls.updateTheme,
          method: 'POST',
          data: json,
          dataType: 'jsonp'
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function (response) {
          deferred.reject(response);
        });
        return deferred.promise;
      }
    };
  }]);
