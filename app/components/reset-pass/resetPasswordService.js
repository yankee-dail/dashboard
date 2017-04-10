'use strict';

uiQaninjasApp.factory('ResetPasswordService', function ($q, $location, $http, urls) {

  var resetPasswordService = {}, errors = { msg: null };

  resetPasswordService.checkResetPassUuid = function (u) {
    var deferred = $q.defer();
    deferred.resolve();
    if (!u) {
      return resetPasswordService.goToForgotPass();
    }
    return $http({
        url: urls.checkResetPassUUID,
        method: 'POST',
        data: {'u': u}
      }
    ).then(function (res) {
      if (!res.data.result) {
        return resetPasswordService.goToForgotPass();
      }
      return deferred.promise;
    }, function () {
      return resetPasswordService.goToForgotPass();
    });
  };

  resetPasswordService.setErrors = function (data) {
    this.errors = data;
  };

  resetPasswordService.getErrors = function () {
    return this.errors;
  };

  return resetPasswordService;
});
