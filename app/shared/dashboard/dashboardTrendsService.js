'use strict';

angular.module('uiQaninjasApp')
  .factory('TrendsService', ['$rootScope', function ($rootScope) {
    return {
      checkIcon: function (name) {
        if (name == "Blocker") {
          return ['alert-outline', 'custom-red'];
        }
        if (name == "Critical") {
          return ['chevron-double-up', 'custom-red'];
        }
        if (name == "Major") {
          return ['chevron-up', 'custom-red'];
        }
        if (name == "Minor") {
          return ['chevron-double-down', 'custom-green'];
        }
        if (name == "Info") {
          return ['chevron-down', 'custom-green'];
        }
      },
      checkNumberColor: function (value) {
        if (value < 0) {
          return ['custom-green', 'arrow-down'];
        }
        if (value > 0) {
          return ['custom-red', 'arrow-up'];
        }
      },
      trendsArrayCheck: function (trendsNumbers) {
        if (trendsNumbers[0] != undefined) {
          return trendsNumbers[0];
        } else {
          return trendsNumbers;
        }
      },
      trendsNotrends: function (getResponse) {
        var trendsName = {};
        if (getResponse.trends != undefined) {
          return trendsName = getResponse.trends;
        } else {
          return trendsName = getResponse.no_trends;
        }
      }
    }
  }])
  .factory('TrendsObjectService', ['$rootScope', 'TrendsService', function ($rootScope, TrendsService) {
    return {
      issueTypeObj: function (trendsName, type, trendsStep, issueType, stepName) {
        var eventKeys = [];
        for (var key in trendsName) {
          eventKeys.push(key)
        }
        var sortArrayKeys = eventKeys.sort();
        if (sortArrayKeys.indexOf('Total') > 0) {
          sortArrayKeys.pop()
        }
        var objectArray = [];
        for (var i = 0; i < sortArrayKeys.length; i++) {
          var value = i;
          var name = sortArrayKeys[i];
          var trendsNumbers = '';
          if (trendsStep == 1) {
            trendsNumbers = trendsName[name];
          }
          if (trendsStep == 2) {
            trendsNumbers = trendsName[name][issueType][type.name];
          }
          if (trendsStep == 3) {
            trendsNumbers = trendsName[name][issueType.issueType][issueType.name];
          }
          value = {
            iconAttr: TrendsService.checkIcon(name),
            name: name,
            allElements: TrendsService.trendsArrayCheck(trendsNumbers),
            trendsElements: trendsNumbers[1],
            numberColor: TrendsService.checkNumberColor(trendsNumbers[1]),
            issueType: type,
            secondStep: stepName,
            trendsStep: trendsStep
          };
          objectArray.push(value);
        }
        return objectArray;
      }
    }
  }])
  .factory('dashboardPieChartArray', ['$rootScope', '$http', 'TrendNotrendFlad', 'ActivityTypeForPieChart', 'urls', '$q', 'themesChartColor',
    function ($rootScope, $http, TrendNotrendFlad, ActivityTypeForPieChart, urls, $q, themesChartColor) {
      var data = {};
      return {
        arrayForChart: function (activitiesType, activitiesName, innerStep, typeName) {
          var pieChartArray = [];
          var arrayValue = stepCheck(activitiesType, activitiesName, innerStep);
          for (var key in arrayValue) {
            pieChartArray.push(key)
          }
          var sortpieChartArray = pieChartArray.sort();
          if (sortpieChartArray.indexOf('Total') > 0) {
            sortpieChartArray.pop()
          }
          var arrayToChart = [['Type', 'Value']];
          for (var i = 0; i < sortpieChartArray.length; i++) {
            var array = i;
            var value = '';
            if (innerStep == 1) {
              value = arrayValue[sortpieChartArray[i]]
            }
            if (innerStep == 2) {
              value = arrayValue[sortpieChartArray[i]][activitiesName][typeName]
            }
            if (innerStep == 3) {
              value = arrayValue[sortpieChartArray[i]][activitiesName][ActivityTypeForPieChart.getData()]
            }
            if (TrendNotrendFlad.getData() == "trends") {
              array = [sortpieChartArray[i], value[0]];
            } else {
              array = [sortpieChartArray[i], value];
            }
            arrayToChart.push(array);
          }
          return [arrayToChart, sortpieChartArray, activitiesName];
        },
        setData: function (val) {
          data = val;
        },
        getData: function () {
          return data;
        },
        themeColorCheck: function (themeColor) {
          for (var i = 0; i < themesChartColor.length; i++) {
            if (themesChartColor[i].dbValue == themeColor) {
              return themesChartColor[i].colors
            }
          }
        }
      };
      function stepCheck(activitiesType, activitiesName, innerStep) {
        if (innerStep == 1) {
          return activitiesType[activitiesName];
        }
        if (innerStep == 2 || innerStep == 3) {
          return activitiesType;
        }
      }
    }])
  .factory('LineChart', ['$rootScope', '$http', 'urls', '$q', function ($rootScope, $http, urls, $q) {
    var data = {};
    return {
      setData: function (val) {
        data = val;
      },
      getData: function () {
        return data;
      },
      contentWidth: function () {
        var value = angular.element($(".header")).width();
        if (value > 944) {
          return value - 450;
        }
        return value - 150;
      }
    };
  }])
  .factory('TrendNotrendFlad', ['$rootScope', function ($rootScope) {
    var data = {};
    return {
      setData: function (val) {
        data = val;
      },
      getData: function () {
        return data;
      }
    };
  }])
  .factory('ActivityTypeForPieChart', ['$rootScope', function ($rootScope) {
    var data = {};
    return {
      setData: function (val) {
        data = val;
      },
      getData: function () {
        return data;
      }
    };
  }])
  .factory('secondPieChartInnerService', ['$rootScope', function ($rootScope) {
    var data = {};
    return {
      setData: function (typeName, trendKeys) {
        data = [typeName, trendKeys];
      },
      getData: function () {
        return data;
      }
    };
  }])
  .factory('DashboardResponseService', ['$rootScope', function ($rootScope) {
    var data = {};
    return {
      setData: function (val) {
        data = val;
      },
      getData: function () {
        return data;
      }
    };
  }])
  .factory('responseFirstStepServices', ['$rootScope', function ($rootScope) {
    var data = {};
    return {
      setData: function (val1, val2) {
        data[0] = val1;
        data[1] = val2;
      },
      getData: function () {
        return data;
      }
    };
  }])
  .factory('responseSecondStepServices', ['$rootScope', function ($rootScope) {
    var data = {};
    return {
      setData: function (val1, val2) {
        data[0] = val1;
        data[1] = val2;
      },
      getData: function () {
        return data;
      }
    };
  }]);

