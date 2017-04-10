'use strict';

var uiQaninjasApp = angular.module('uiQaninjasApp', ['ngResource', 'ngRoute', 'ngSanitize', 'LocalStorageModule',
  'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria']);

uiQaninjasApp.config(function ($provide, $locationProvider, localStorageServiceProvider, $mdThemingProvider,
                               $mdIconProvider) {
  $locationProvider.html5Mode(true);
  localStorageServiceProvider.setPrefix('uiQaninjasApp').setStorageType('sessionStorage').setNotify(true, true);

  $mdIconProvider.defaultIconSet('/images/mdi.svg');

  $mdThemingProvider.theme('default').primaryPalette('indigo', {
    'default': '500',
    'hue-1': '400',
    'hue-2': '700',
    'hue-3': 'A100'
  }).accentPalette('light-blue', {
    'default': 'A700'
  }).warnPalette('red');
  $mdThemingProvider.theme('custom-1').primaryPalette('purple').accentPalette('pink').warnPalette('red');
  $mdThemingProvider.theme('custom-2').primaryPalette('teal').accentPalette('cyan').warnPalette('red');
  $mdThemingProvider.theme('custom-3').primaryPalette('orange').accentPalette('amber').warnPalette('red');
  $mdThemingProvider.theme('custom-4').primaryPalette('light-green').accentPalette('lime').warnPalette('red');
  $mdThemingProvider.setDefaultTheme('default');
  $mdThemingProvider.alwaysWatchTheme(true);

  $provide.decorator('mdMaxlengthDirective', ['$delegate', function ($delegate) {
    //$delegate is array of all md-maxlength directive in this case first one is angular built in ng-click so we remove it
    $delegate.shift();
    return $delegate;
  }]);
});

uiQaninjasApp.run(function ($http, $rootScope, $location, $anchorScroll, $timeout, localStorageService) {
  if (localStorageService.get('uiQaninjasAppSessionData')) {
    var data = localStorageService.get('uiQaninjasAppSessionData');
    $http.defaults.headers.common['Authorization'] = data.token_type + ' ' + data.access_token;
  }
  $rootScope.page = {
    setTitle: function (title) {
      this.title = title;
    }
  };
  $rootScope.$on('$routeChangeSuccess', function (event, current) {
    $rootScope.page.setTitle(current.$$route.title || 'Default Title');
    if ($location.hash()) {
      $timeout(function () {
        var hashId = $location.hash();
        $anchorScroll();
        document.getElementById(hashId).focus();
      });
    }
  });
});

angular.module('uiQaninjasApp').directive("mdMaxlength", mdMaxlengthDirective);

function mdMaxlengthDirective($animate) {
  return {
    restrict: 'A',
    require: ['ngModel', '^mdInputContainer'],
    link: postLink
  };

  function postLink(scope, element, attr, ctrls) {
    var maxLength, ngModelCtrl = ctrls[0], containerCtrl = ctrls[1],
      errorsSpacer = angular.element(containerCtrl.element[0].querySelector('.md-errors-spacer')),
      charCountEl = angular.element('<div class="md-char-counter">');
    attr.$set('ngTrim', 'false');
    errorsSpacer.append(charCountEl);
    ngModelCtrl.$formatters.push(renderCharCount);
    ngModelCtrl.$viewChangeListeners.push(renderCharCount);
    element.on('input keydown', function () {
      renderCharCount(); //make sure it's called with no args
    });
    scope.$watch(attr.mdMaxlength, function (value) {
      maxLength = value;
      if (angular.isNumber(value) && value > 0) {
        if (!charCountEl.parent().length) {
          $animate.enter(
            charCountEl,
            containerCtrl.element,
            angular.element(containerCtrl.element[0].lastElementChild)
          );
        }
        renderCharCount();
      } else {
        $animate.leave(charCountEl);
      }
    });
    ngModelCtrl.$validators['md-maxlength'] = function (modelValue, viewValue) {
      if (!angular.isNumber(maxLength) || maxLength < 0) {
        return true;
      }
      return (modelValue || element.val() || viewValue || '').length <= maxLength;
    };
    function renderCharCount(value) {
      //Original code commented
      //charCountEl.text( ( element.val() || value || '' ).length + '/' + maxlength );
      //CHANGE PROPOSED BY @breeze4 (MATT BAILEY): http://tinyurl.com/pxnnvxb
      charCountEl.text((ngModelCtrl.$modelValue || '').length + '/' + maxLength);
      return value;
    }
  }
}
mdMaxlengthDirective.$inject = ["$animate"];
