'use strict';

angular.module('uiQaninjasApp')
  .run(['$templateCache', function($templateCache) {
    $templateCache.put('shared/landing-footer/landing-footer.html',
      '<footer ng-cloak>\n' +
      '  <md-toolbar class="footer" layout="row" layout-align="space-between center" layout-xs="column" layout-align-xs="center center">\n' +
      '  <span>\n' +
      '    <md-button ng-href="{{siteUrl}}" target="_blank" title="Romexsoft" aria-label="Romexsoft">\n' +
      '      &copy; {{year}} Romexsoft LLC\n' +
      '    </md-button>\n' +
      '  </span>\n' +
      '  <span>\n' +
      '    <md-button ng-href="{{facebook}}" target="_blank" class="md-icon-button"\n' +
      '        title="Romexsoft Facebook" aria-label="Romexsoft Facebook">\n' +
      '      <md-icon md-svg-icon="facebook-box" alt="Facebook"></md-icon>\n' +
      '    </md-button>\n' +
      '    <md-button ng-href="{{linkedIn}}" target="_blank" class="md-icon-button"\n' +
      '        title="Romexsoft LinkedIn" aria-label="Romexsoft LinkedIn">\n' +
      '      <md-icon md-svg-icon="linkedin-box" alt="LinkedIn"></md-icon>\n' +
      '    </md-button>\n' +
      '    <md-button ng-href="{{twitter}}" target="_blank" class="md-icon-button"\n' +
      '        title="Romexsoft Twitter" aria-label="Romexsoft Twitter">\n' +
      '      <md-icon md-svg-icon="twitter-box" alt="Twitter"></md-icon>\n' +
      '    </md-button>\n' +
      '    <md-button ng-href="{{googlePlus}}" target="_blank" class="md-icon-button"\n' +
      '        title="Romexsoft Google+" aria-label="Romexsoft Google+">\n' +
      '      <md-icon md-svg-icon="google-plus-box" alt="Google+"></md-icon>\n' +
      '    </md-button>\n' +
      '  </span>\n' +
      '  </md-toolbar>\n' +
      '</footer>\n');
  }])
  .directive("landingFooter", function () {
    return {
      restrict: 'E',
      templateUrl: 'shared/landing-footer/landing-footer.html',
      scope: true,
      transclude: false,
      controller: 'LandingFooterController'
    };
  });


