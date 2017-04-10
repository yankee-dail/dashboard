'use strict';

angular.module('uiQaninjasApp').service('UserDataService', ['$http', '$q', 'urls', 'localStorageService', 'ServiceFactory',
  function($http, $q, urls, localStorageService, ServiceFactory) {
  var deferObject;
  return {
    getChosenService: function() {
      if (localStorageService.get('serviceId')) {
        return localStorageService.get('serviceId');
      }
      var serviceId = ServiceFactory.getServiceId();
      localStorageService.set('serviceId', serviceId);
      return serviceId;
    },
    getUserData: function(chooseService) {
      var promise = $http({
        url: urls.dashboardDataUrl.format(chooseService),
        dataType: 'jsonp',
        method: 'GET'
      }), deferObject =  deferObject || $q.defer();
      promise.then(
        function successCallback(answer){
          // This code will only run if we have a successful promise.
          deferObject.resolve(answer);
        },
        function errorCallback(reason){
          // This code will only run if we have a failed promise.
          deferObject.reject(reason);
        });
      return deferObject.promise;
    }
  };
}]);
