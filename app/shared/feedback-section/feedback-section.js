'use strict';

angular.module('uiQaninjasApp').directive("feedbackSection", function () {
  return {
    restrict: 'A',
    templateUrl: 'shared/feedback-section/feedback-section.html',
    scope: true,
    transclude: false,
    controller: 'FeedbackSectionCtrl'
  };
});
