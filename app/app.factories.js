'use strict';

angular.module('uiQaninjasApp').factory('Session', ['$http', 'localStorageService',
  function ($http, localStorageService) {
    var data = {};
    return {
      create: function (d) {
        data.access_token = d.access_token;
        data.expires_in = d.expires_in;
        data.refresh_token = d.refresh_token;
        data.scope = d.scope;
        data.token_type = d.token_type;
        data.user = d.user;
        localStorageService.set('sessionData', data);
      },
      destroy: function () {
        data = {};
        localStorageService.remove('sessionData');
        localStorageService.remove('serviceId');
      },
      getData: function () {
        if (!data.access_token && localStorageService.get('sessionData')) {
          data = localStorageService.get('sessionData');
          $http.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token;
        }
        return data;
      },
      updateLoggedUser: function (user) {
        data.user = user;
        localStorageService.set('sessionData', data);
      }
    };
  }]);

angular.module('uiQaninjasApp').factory('AuthService', ['$http', 'Session', 'urls', 'oauth_options', '$location', '$q',
  '$rootScope',
  function ($http, Session, urls, oauth_options, $location, $q, $rootScope) {
    return {
      login: function (credentials) {
        var addition_url = '?client_id=' + oauth_options.client_id;
        addition_url += '&client_secret=' + oauth_options.client_secret;
        addition_url += '&grant_type=' + oauth_options.grant_type;
        addition_url += '&scope=' + oauth_options.scope;
        addition_url += '&username=' + credentials.username;
        addition_url += '&password=' + credentials.password;
        return $http({
            url: urls.authUrl + addition_url,
            method: 'POST'
          }
        ).then(function (res) {
          $http.defaults.headers.common['Authorization'] = res.data.token_type + ' ' + res.data.access_token;
          var authData = res.data;
          $http.get(urls.getLoggedUser).then(function (res) {
            authData.user = res.data.msg.user;
            Session.create(authData);
            $location.url('/services');
          }, function (res) {
            $rootScope.authErrorResponse = res;
          });
        }, function (res) {
          $rootScope.authErrorResponse = res;
        });
      },
      isAuthenticated: function () {
        return !!Session.getData().access_token;
      },
      errorResponse: function () {
        return $rootScope.authErrorResponse || {};
      },
      getLoggedUser: function () {
        return Session.getData().user;
      },
      updateLoggedUser: function (user) {
        Session.updateLoggedUser(user);
        $rootScope.$broadcast('event:user-change');
      },
      userPassesTest: function (conditions, nextUrl, defaultUrl) {
        var deferred = $q.defer();
        deferred.resolve();
        conditions ? $location.url(nextUrl) : $location.url(defaultUrl);
        return deferred.promise;
      }
    };
  }]);

angular.module('uiQaninjasApp')
  .controller('ThemeController', ['$scope', 'ThemeService', '$window',
    function ($scope, ThemeService, $window) {
      $scope.theme = ThemeService.getTheme();
      $scope.$on('event:theme-changed', function () {
        $scope.theme = ThemeService.getTheme();
      });
    }
  ])
  .factory('ThemeService', ['$rootScope',
    function ($rootScope) {
      var _theme = 'default';
      return {
        getTheme: function () {
          return _theme;
        },
        setTheme: function (theme) {
          _theme = theme;
          $rootScope.$broadcast('event:theme-changed');
        },
        setDefaultTheme: function () {
          _theme = 'default';
          $rootScope.$broadcast('event:theme-changed');
        }
      }
    }])
  /**
   * @doc directive
   * @name extSvg
   * @description directive for embedding SVG content into a HTML page
   */
  .directive('canvasTrianglify', ['$compile', '$window',
    function ($compile, $window) {
      return {
        restrict: 'E',
        replace: true,
        link: function (scope, $element) {
          var width = $window.innerWidth,
            height = $window.innerHeight;
          scope.background = function() {
            var pattern =  Trianglify({
              width: $window.innerWidth,
              height: $window.innerHeight,
              cell_size: 40,
              x_colors: 'YlGnBu'
            });
            return pattern.canvas();
          };
          $element.replaceWith($compile(scope.background())(scope.$parent));
          return angular.element($window).bind('resize', function() {
            $element.replaceWith($compile(scope.background())(scope.$parent));
            return scope.$apply();
          });
        }
      };
    }]);
