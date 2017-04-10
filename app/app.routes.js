angular.module('uiQaninjasApp').config(['$routeProvider',

  function ($routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'components/landing/landing.html',
        title: 'Home',
        controller: 'LandingController'
      }).
      when('/sign-in', {
        templateUrl: 'components/sign-in/sign-in.html',
        title: 'Sign In',
        controller: 'SignInController',
        resolve: {
          permission: function (AuthService) {
            return AuthService.userPassesTest(AuthService.isAuthenticated(), '/services');
          }
        }
      }).
      when('/forgot-pass', {
        templateUrl: 'components/forgot-pass/forgot-password.html',
        title: 'Forgot Password',
        controller: 'ForgotPasswordController'
      }).
      when('/reset-pass', {
        templateUrl: 'components/reset-pass/reset-password.html',
        title: 'Reset Password',
        controller: 'ResetPasswordController',
        resolve: {
          permission: function ($location, ResetPasswordService) {
            return ResetPasswordService.checkResetPassUuid($location.search().u);
          }
        }
      }).
      when('/services', {
        templateUrl: 'components/services/services.html',
        title: 'Services',
        controller: 'ServicesController',
        resolve: {
          permission: function (AuthService) {
            return AuthService.userPassesTest(AuthService.isAuthenticated(), '/services', '/sign-in');
          }
        }
      }).
      when('/dashboard', {
        templateUrl: 'components/dashboard/dashboard-layout.html',
        title: 'Dashboard',
        controller: 'DashboardController',
        resolve: {
          permission: function (AuthService) {
            return AuthService.userPassesTest(AuthService.isAuthenticated(), '/dashboard', '/sign-in');
          }
        }
      }).
      when('/dashboard/profile', {
        templateUrl: 'components/dashboard-profile/dashboard-profile.html',
        title: 'Profile',
        controller: 'ProfileController',
        resolve: {
          permission: function (AuthService) {
            return AuthService.userPassesTest(AuthService.isAuthenticated(), '/dashboard/profile', '/sign-in');
          }
        }
      }).
      otherwise({
        redirectTo: '/'
      });

  }]);
