'use strict';

angular.module('uiQaninjasApp').controller('LandingHeaderController', ['$scope', '$location', 'AuthService', 'Session',
  '$mdSidenav', '$timeout', 'appRoutes', 'ThemeService', '$route',
  function ($scope, $location, AuthService, Session, $mdSidenav, $timeout, appRoutes, ThemeService, $route) {
    $scope.signInUrl = appRoutes.signIn;
    $scope.servicesUrl = appRoutes.services;
    $scope.profileUrl = appRoutes.profile;
    $scope.user = {
      loggedIn: AuthService.isAuthenticated(),
      info: AuthService.getLoggedUser()
    };
    if (AuthService.isAuthenticated()) {
      ThemeService.setTheme($scope.user.info.theme);
    }
    $scope.signInLocation = false;
    if ($location.path() === '/sign-in') {
      $scope.signInLocation = true;
      $scope.showSignUp = $route.current.scope.showSignUp;
    }

    var originatorEv;
    $scope.openMenu = function ($mdOpenMenu, $event) {
      originatorEv = $event;
      $mdOpenMenu($event);
    };

    $scope.signOut = function () {
      Session.destroy();
      $scope.user = {
        loggedIn: AuthService.isAuthenticated(),
        info: null
      };
      $location.url(appRoutes.signIn);
    };

    $scope.toggleUserMenu = buildDelayedToggle('right');

    $scope.close = function () {
      $mdSidenav('right').close();
    };

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
          args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function () {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    $scope.keepOpen = false;
    function buildDelayedToggle(navID) {
      return debounce(function () {
        $mdSidenav(navID).toggle().then(function(){
          $scope.keepOpen = !$scope.keepOpen;
          if ($scope.keepOpen) {
            angular.element('md-backdrop.md-sidenav-backdrop-custom').removeClass('disabled');
            $('body').css('overflow', 'hidden');
          }else{
            angular.element('md-backdrop.md-sidenav-backdrop-custom').addClass('disabled');
          }
        });
      }, 200);
    }
    $scope.checkClosingForm = function(){
      if(true){
        $('body').css('overflow', 'auto');
        $scope.toggleUserMenu('right');
      }
    };
  }]);
