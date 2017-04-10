'use strict';

if (!String.prototype.format) {
  String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
    });
  };
}

angular.module('uiQaninjasApp')
  .constant('urls', {
    'servicesUrl': 'https://qaninjas.herokuapp.com/api/v1/services/items/',
    'dashboardDataUrl': 'https://qaninjas.herokuapp.com/api/v1/dashboard/get/service/{0}/',
    'projectUrl': 'https://qaninjas.herokuapp.com/api/v1/dashboard/get/project/{0}/service/{1}/',
    'releaseUrl': 'https://qaninjas.herokuapp.com/api/v1/dashboard/get/project/{0}/release/{1}/service/{2}/',
    'authUrl': 'https://qaninjas.herokuapp.com/o/token/',
    'sendGetInTouch': 'https://qaninjas.herokuapp.com/api/v1/common/send-get-in-touch/',
    'sendForgotPass': 'https://qaninjas.herokuapp.com/api/v1/common/send-forgot-pass/',
    'checkResetPassUUID': 'https://qaninjas.herokuapp.com/api/v1/common/check-reset-pass-uuid/',
    'changePass': 'https://qaninjas.herokuapp.com/api/v1/common/change-pass/',
    'getLoggedUser': 'https://qaninjas.herokuapp.com/api/v1/common/get-logged-user/',
    'usersRest': 'https://qaninjas.herokuapp.com/api/v1/users/items/',
    'updatePassword': 'https://qaninjas.herokuapp.com/api/v1/common/update-password/',
    'sendFeedback': 'https://qaninjas.herokuapp.com/api/v1/common/send-feedback/',
    'personalInfo': 'https://qaninjas.herokuapp.com/api/v1/dashboard/user-profile/',
    'updateTheme': 'https://qaninjas.herokuapp.com/api/v1/common/update-theme/',
    'allReleasesValue': 'https://qaninjas.herokuapp.com/api/v1/dashboard/releases-activity/project/{0}/service/{1}/'
  })
  .constant('oauth_options', {
    'client_id': 'Ealp7p6VEAczFazvwcOOlDw7yzx1cSvcwUs3pIFm',
    'client_secret': 'Dey7LVLceF51dEK48mpNX8i51FqBSEClTp0ZMB1aeX2v4CDTNzBRWJEtzrXvb7qo670auwiNF3MWZloCWAfWU8qenemLTxq6TDA1KnX9WDd33p0Uv9iBB8s0jFRr8mCN',
    'grant_type': 'password',
    'scope': 'read'
  })
  .constant('romexsoft', {
    'url': 'https://www.romexsoft.com',
    'facebook': 'https://www.facebook.com/Romexsoft',
    'linkedIn': 'https://www.linkedin.com/company/romexsoft',
    'twitter': 'https://twitter.com/Romexsoft',
    'googlePlus': 'https://plus.google.com/u/0/112006173202591784496/about',
    'slideShare': 'https://www.slideshare.net/Romexsoft'
  })
  .constant('appRoutes', {
    'dashboard': '/dashboard',
    'signIn': '/sign-in',
    'services': '/services',
    'profile': '/dashboard/profile'
  })
  .constant('themes', [
    {
      'name': 'Default',
      'dbValue': 'default',
      'colors': ['#3F51B5', '#9FA8DA', '#2196F3', '#90CAF9']
    },
    {
      'name': 'Purple',
      'dbValue': 'custom-1',
      'colors': ['#9C27B0', '#CE93D8', '#E91E63', '#F48FB1']
    },
    {
      'name': 'Teal',
      'dbValue': 'custom-2',
      'colors': ['#009688', '#80CBC4', '#00BCD4', '#80DEEA']
    },
    {
      'name': 'Amber',
      'dbValue': 'custom-3',
      'colors': ['#FF9800', '#FFCC80', '#FFC107', '#FFE082']
    },
    {
      'name': 'Lime',
      'dbValue': 'custom-4',
      'colors': ['#CDDC39', '#E6EE9C', '#8BC34A', '#C5E1A5']
    }
  ])
  .constant('themesChartColor', [
    {
      'dbValue': 'default',
      'colors': ['#1976D2', '#1E88E5', '#2196F3', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD']
    },
    {
      'dbValue': 'custom-1',
      'colors': ['#7B1FA2', '#8E24AA', '#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8', '#E1BEE7', '#F3E5F5']
    },
    {
      'dbValue': 'custom-2',
      'colors': ['#00796B', '#00897B', '#009688', '#26A69A', '#4DB6AC', '#80CBC4', '#B2DFDB', '#E0F2F1']
    },
    {
      'dbValue': 'custom-3',
      'colors': ['#F57C00', '#FB8C00', '#FF9800', '#FFA726', '#FFB74D', '#FFCC80', '#FFE0B2', '#FFF3E0']
    },
    {
      'dbValue': 'custom-4',
      'colors': ['#AFB42B', '#C0CA33', '#CDDC39', '#D4E157', '#DCE775', '#E6EE9C', '#F0F4C3', '#F9FBE7']
    }
  ]);
