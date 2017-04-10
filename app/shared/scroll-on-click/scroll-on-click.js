'use strict';

angular.module('uiQaninjasApp').directive('scrollOnClick', function () {
  return {
    restrict: 'A',
    link: function (scope, $elm, attrs) {
      var idToScroll = attrs.anchor;
      $elm.on('click', function (event) {
        event.preventDefault();
        var $target = idToScroll ? $(idToScroll) : $elm;
        $('html, body').animate({scrollTop: $target.offset().top}, 'slow');
        return false;
      });
    }
  }
});
