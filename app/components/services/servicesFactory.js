'use strict';

angular.module('uiQaninjasApp').factory('ServiceFactory', function () {
  var _serviceId;
  return {
    getServiceId: function () {
      return _serviceId;
    },
    setServiceId: function (service) {
      _serviceId = service.id
    }
  }
});
