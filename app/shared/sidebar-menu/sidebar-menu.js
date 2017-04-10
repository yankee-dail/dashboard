'use strict';

angular.module('uiQaninjasApp')
  //.run(['$templateCache', function($templateCache){
  //  $templateCache.put('shared/sidebar-menu/sidebar-menu.html',
  //    '<md-button class="md-button-toggle"\n' +
  //    '  ng-click="toggle()"\n' +
  //    '  aria-controls="side-menu-{{section.name}}"\n' +
  //    '  layout="row"\n' +
  //    '  aria-expanded="{{isOpen()}}">\n' +
  //    '  {{section.name}}\n' +
  //    '  <span aria-hidden="true" class=" pull-right fa fa-chevron-down md-toggle-icon"\n' +
  //    '  ng-class="{\'toggled\' : isOpen()}"></span>\n' +
  //    '</md-button>\n' +
  //    '<ul ng-show="isOpen()" id="side-menu-{{section.name}}" class="menu-toggle-list">\n' +
  //    '  <li ng-repeat="page in section.pages">\n' +
  //    '    <menu-link section="page"></menu-link>\n' +
  //    '  </li>\n' +
  //    '</ul>\n' +
  //    '');
  //}])
  .directive('sidebarMenu', function() {
    return {
      restrict: 'E',
      templateUrl: 'shared/sidebar-menu/sidebar-menu.html',
      scope: true,
      transclude : false,
      controller: 'SidebarMenuController'
    };
  });
