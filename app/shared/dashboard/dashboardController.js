'use strict';
google.load('visualization', '1.0', {'packages': ['corechart', 'annotationchart']});
angular.module('uiQaninjasApp')
  .controller('DashboardController', ['$scope', '$http', '$q', 'urls', 'limitToFilter', 'appRoutes',
    'DashboardResponseService', '$timeout', '$mdSidenav', 'UserDataService',
    '$location', 'Session', 'responseFirstStepServices', 'responseSecondStepServices', 'TrendsService', 'TrendsObjectService',
    'dashboardPieChartArray', 'TrendNotrendFlad', 'ActivityTypeForPieChart', 'secondPieChartInnerService', 'themes', 'LineChart', 'AuthService',
    function ($scope, $http, $q, urls, limitToFilter, appRoutes,
              DashboardResponseService, $timeout, $mdSidenav, UserDataService,
              $location, Session, responseFirstStepServices, responseSecondStepServices, TrendsService, TrendsObjectService,
              dashboardPieChartArray, TrendNotrendFlad, ActivityTypeForPieChart, secondPieChartInnerService, themes, LineChart, AuthService) {

      $scope.toggleLeft = buildDelayedToggler('dashboardSidebar');
      function debounce(func, wait, context) {
        var timer;
        return function debounced() {
          var context = $scope,
            args = Array.prototype.slice.call(arguments);
          $timeout.cancel(timer);
          timer = $timeout(function () {
            timer = undefined;
            func.apply(context, args);
          }, wait || 10);
        };
      }

      function buildDelayedToggler(navID) {
        return debounce(function () {
          $mdSidenav(navID).toggle();
        }, 200);
      }

      $scope.isLoading = true;
      $scope.chosenService = UserDataService.getChosenService();
      var data = UserDataService.getUserData($scope.chosenService);
      data.then(function (response) {
        var responseDataMsg = response.data.msg;
        $scope.isLoading = false;
        $scope.vendor = responseDataMsg.vendor;
        $scope.projects = responseDataMsg.projects;
        $scope.currentProject = responseDataMsg.current_project;
        $scope.releases = responseDataMsg.releases;
        $scope.currentRelease = responseDataMsg.current_release;
        dashboardPieChartArray.setData(AuthService.getLoggedUser().theme);
        trendsCheck(responseDataMsg);
        var releasesValue = allReleaseValue($scope.currentProject);
        releasesValue.then(function (data) {
          LineChart.setData(data.msg.activities_count[0]);
          componentsLineChart();
        });
        DashboardResponseService.setData(responseDataMsg);
      }, function () {
        Session.destroy();
        $location.url(appRoutes.signIn);
      });
      $scope.chooseRelease = function (release) {
        $scope.isLoading = true;
        $http({
          url: urls.releaseUrl.format($scope.currentProject.id, release.id, $scope.chosenService),
          method: 'GET',
          dataType: 'jsonp'
        }).then(function successCallback(response) {
          $scope.isLoading = false;
          var responseDataMsg = response.data.msg;
          $scope.vendor = responseDataMsg.vendor;
          $scope.projects = responseDataMsg.projects;
          $scope.currentProject = responseDataMsg.current_project;
          $scope.releases = responseDataMsg.releases;
          $scope.currentRelease = responseDataMsg.current_release;
          trendsCheck(responseDataMsg);
          DashboardResponseService.setData(responseDataMsg);
        }, function errorCallback() {
          Session.destroy(response.data.msg);
          $location.url(appRoutes.signIn);
        });
      };
      $scope.chooseProject = function (project) {
        $scope.isLoading = true;
        $http({
          url: urls.projectUrl.format(project.id, $scope.chosenService),
          method: 'GET',
          dataType: 'jsonp'
        }).then(function successCallback(response) {
          $scope.isLoading = false;
          var responseDataMsg = response.data.msg;
          $scope.vendor = responseDataMsg.vendor;
          $scope.projects = responseDataMsg.projects;
          $scope.currentProject = responseDataMsg.current_project;
          $scope.releases = responseDataMsg.releases;
          $scope.currentRelease = responseDataMsg.current_release;
          var releasesValue = allReleaseValue($scope.currentProject);
          releasesValue.then(function (data) {
            LineChart.setData(data.msg.activities_count[0]);
            componentsLineChart();
          });
          trendsCheck(responseDataMsg);
          DashboardResponseService.setData(responseDataMsg);
        }, function errorCallback() {
          Session.destroy();
          $location.url(appRoutes.signIn);
        });
      };
      function allReleaseValue(project) {
        var deferred = $q.defer();
        $http.get(urls.allReleasesValue.format(project.id, UserDataService.getChosenService())).success(function (response) {
          deferred.resolve(response);
        });
        return deferred.promise;
      }

      function componentsSidebar(response, $scope) {
        $scope.vendor = response.vendor.vendor_id__vendor_name;
        $scope.projects = response.projects;
        $scope.current_project = response.current_project;
        $scope.releases = response.releases.reverse();
      }

      function trendsCheck(responseDataMsg) {
        if (responseDataMsg.trends) {
          var trendsType = responseDataMsg.trends.activities;
          TrendNotrendFlad.setData('trends');
          trendsKeyCount(responseDataMsg, trendsType);
        } else {
          var trendsType = responseDataMsg.no_trends.activities;
          TrendNotrendFlad.setData('no_trends');
          trendsKeyCount(responseDataMsg, trendsType);
        }
      }

      function trendsKeyCount(trends, trendsType) {
        $scope.lastReleasesDate = trends.current_release.release.end_date;
        $scope.previosReleasesDate = trends.releases[1].end_date;
        var trendKeys = [];
        for (var key in trendsType) {
          trendKeys.push(key)
        }
        $scope.showDropdown = true;
        responseFirstStepServices.setData(trendsType, trendKeys[0]);
        if (trendKeys.length < 2) {
          firstPieChartInner(trendsType, trendKeys[0]);
          componentFirsInner(trendsType, trendKeys[0]);
        } else {
          pieChartActivityArray(trendsType, trendKeys);
          trendsActivityArray(trendsType, trendKeys);
          $scope.showDropdown = false;
        }
      }

      function componentsLineChart(activitiesType) {
        var releaseArray = LineChart.getData();
        var componentsKeys = [];
        for (var key in releaseArray) {
          componentsKeys.push(key);
        }
        var value = activitiesType;
        if (activitiesType == undefined) {
          value = componentsKeys[0];
        }
        $scope.dropdownShowLineChart = true;
        if (componentsKeys.length > 1) {
          $scope.activitiesValue = value;
          $scope.componentsKeysValue = componentsKeys;
          $scope.dropdownShowLineChart = false;
          $scope.trendKeysLine = componentsKeys;
        }
        $scope.placeholderValue = value;
        $scope.lineChartReleaseArray = releaseArray[value];
        drawChartLine();
      }

      $scope.activitiesChangeValue = function (activitiesType) {
        componentsLineChart(activitiesType);
      };
      function pieChartActivityArray(trendsType, trendKeys) {
        $scope.trendKeysPie = trendKeys;
        $scope.activitiesValuePie = trendKeys[0];
        firstPieChartInner(trendsType, trendKeys[0]);
      }

      function trendsActivityArray(trendsType, trendKeys) {
        $scope.trendKeys = trendKeys;
        $scope.activitiesValue = trendKeys[0];
        componentFirsInner(trendsType, trendKeys[0]);
      }

      $scope.changeActivitiesPie = function (trendsType) {
        firstPieChartInner(responseFirstStepServices.getData()[0], trendsType);
      };
      $scope.changeActivities = function (trendsType) {
        componentFirsInner(responseFirstStepServices.getData()[0], trendsType);
      };
      function componentFirsInner(trends, name) {
        $scope.activeBackBtnFirstStep = false;
        $scope.activeBackBtnThirdStep = false;
        $scope.backBtnSecondStep = [false, false];
        var trendsStep = 1;
        var trendsName = trends[name];
        $scope.trendsCustomName = name;
        if (trendsName.Total.length > 1) {
          $scope.trendsCustomTotal = trendsName.Total[0];
          $scope.trendsCustomTotalTrend = trendsName.Total[1];
          $scope.numberColor = TrendsService.checkNumberColor(trendsName.Total[1]);
        } else {
          $scope.trendsCustomTotal = trendsName.Total;
          $scope.trendsCustomTotalTrend = 0;
          $scope.numberColor = '';
        }
        $scope.issueObject = TrendsObjectService.issueTypeObj(trendsName, name, trendsStep);
      }

      function componentsSecondInner(getResponse, value) {
        $scope.activeBackBtnFirstStep = true;
        $scope.activeBackBtnThirdStep = false;
        $scope.backBtnSecondStep = [false, true];
        var trendsStep = 2;
        var trendsValue = "components";
        $scope.trendsCustomName = value.name;
        var trendsName = TrendsService.trendsNotrends(getResponse);
        var trendsResponse = trendsName.all[$scope.trendsCustomName];
        if (trendsResponse[0] != undefined) {
          $scope.trendsCustomTotal = trendsResponse[0];
          $scope.trendsCustomTotalTrend = trendsResponse[1];
          $scope.numberColor = TrendsService.checkNumberColor(trendsResponse[1]);
        } else {
          $scope.trendsCustomTotal = trendsResponse;
          $scope.trendsCustomTotalTrend = 0;
          $scope.numberColor = '';
        }
        $scope.issueObject = TrendsObjectService.issueTypeObj(trendsName[trendsValue], value, trendsStep, value.issueType, trendsValue);
      }

      function componentsThirdInner(getResponse, value) {
        $scope.activeBackBtnThirdStep = true;
        $scope.backBtnSecondStep = [true, true];
        var trendsStep = 3;
        var trendsValue = 'environment';
        $scope.disableShowBtn = true;
        var componentValue = value.name;
        $scope.trendsCustomName = componentValue;
        var trendsName = TrendsService.trendsNotrends(getResponse);
        var trendsResponse = trendsName[value.secondStep][componentValue][value.issueType.issueType][value.issueType.name];
        if (trendsResponse[0] != undefined) {
          $scope.trendsCustomTotal = trendsResponse[0];
          $scope.trendsCustomTotalTrend = trendsResponse[1];
          $scope.numberColor = TrendsService.checkNumberColor(trendsResponse[1]);
        } else {
          $scope.trendsCustomTotal = trendsResponse;
          $scope.trendsCustomTotalTrend = 0;
          $scope.numberColor = '';
        }
        $scope.issueObject = TrendsObjectService.issueTypeObj(trendsName[trendsValue][componentValue], value, trendsStep, value.issueType, trendsValue);
      }

      $scope.openInner = function (value) {
        if (value.trendsStep === 1) {
          responseSecondStepServices.setData(DashboardResponseService.getData(), value);
          componentsSecondInner(DashboardResponseService.getData(), value);
        }
        if (value.trendsStep === 2) {
          componentsThirdInner(DashboardResponseService.getData(), value);
        }
      };
      $scope.breadCrumbs = function (step) {
        if (step === 1) {
          var responseValue = responseFirstStepServices.getData();
          componentFirsInner(responseValue[0], responseValue[1]);
        }
        if (step === 2) {
          var responseValue = responseSecondStepServices.getData();
          componentsSecondInner(responseValue[0], responseValue[1]);
        }
      };
      function graphDraw(trendsType, trendKeys, innerStep, typeName) {
        var value = dashboardPieChartArray.arrayForChart(trendsType, trendKeys, innerStep, typeName);
        var data = google.visualization.arrayToDataTable(value[0]);
        var view = new google.visualization.DataView(data);
        var options = {
          title: '',
          pieHole: 0.4,
          'width': 320,
          'height': 300,
          'legend': 'bottom',
          'pieSliceTextStyle': {
            color: '#fff',
            fontSize: '14'
          },
          'chartArea': {left: 0, top: 20, width: '100%', height: '70%'},
          'colors': dashboardPieChartArray.themeColorCheck(dashboardPieChartArray.getData()),
          'tooltip': {trigger: 'selection'}
        };
        var chart = new google.visualization.PieChart(document.getElementById('spectrum'));
        if (innerStep != 3) {
          chart.setAction({
            id: 'sample',
            text: 'Show',
            action: function () {
              var selection = chart.getSelection();
              trackStep(value[1][selection[0].row], value[2], (innerStep + 1), typeName);
            }
          });
        }
        chart.draw(view, options);
      }

      function drawChartLine() {
        var chartSize = LineChart.contentWidth();
        var array = [['Date', $scope.placeholderValue, 'string', 'string']];
        for (var i = 0; i < $scope.lineChartReleaseArray.length; i++) {
          var date = $scope.lineChartReleaseArray[i][2].split('-');
          var releaseVal = "Release " + $scope.lineChartReleaseArray[i][1];
          array.push([
            new Date(date),
            $scope.lineChartReleaseArray[i][3],
            $scope.placeholderValue,
            releaseVal
          ]);
        }
        var data = google.visualization.arrayToDataTable(array);
        var chart = new google.visualization.AnnotationChart(document.getElementById('line-chart'));
        var options = {
          width: chartSize,
          height: chartSize / 2.7,
          colors: dashboardPieChartArray.themeColorCheck(dashboardPieChartArray.getData(), themes),
          displayZoomButtons: false,
          displayAnnotations: true
        };
        chart.draw(data, options);
      }
      $(window).on('resize', function () {
        drawChartLine();
      });
      function trackStep(value1, value2, innerStep) {
        if (innerStep == 2) {
          secondPieChartInner(value1, value2);
          $scope.activeBackBtnFirstStepPieChart = true;
          $scope.activeBackBtnThirdStepPieChart = false;
          $scope.backBtnSecondStepPieChart = [false, true];
          $scope.$apply();
        }
        if (innerStep == 3) {
          $scope.activeBackBtnThirdStepPieChart = true;
          $scope.backBtnSecondStepPieChart = [true, true];
          $scope.$apply();
          thirdPieChartInner(value1, value2);
        }
      }

      function firstPieChartInner(trendsType, trendKeys) {
        $scope.activeBackBtnFirstStepPieChart = false;
        $scope.activeBackBtnThirdStepPieChart = false;
        $scope.backBtnSecondStepPieChart = [false, false];
        var innerStep = 1;
        graphDraw(trendsType, trendKeys, innerStep);
      }

      function secondPieChartInner(typeName, trendKeys) {
        $scope.activeBackBtnFirstStepPieChart = true;
        $scope.activeBackBtnThirdStepPieChart = false;
        $scope.backBtnSecondStepPieChart = [false, true];
        var innerStep = 2;
        secondPieChartInnerService.setData(typeName, trendKeys);
        var trendsValue = "components";
        ActivityTypeForPieChart.setData(typeName);
        var secondInnerObj = DashboardResponseService.getData()[TrendNotrendFlad.getData()][trendsValue];
        graphDraw(secondInnerObj, trendKeys, innerStep, typeName);
      }

      function thirdPieChartInner(typeName, trendKeys) {
        var innerStep = 3;
        var trendsValue = "environment";
        var thirdInnerObj = DashboardResponseService.getData()[TrendNotrendFlad.getData()][trendsValue][typeName];
        graphDraw(thirdInnerObj, trendKeys, innerStep, typeName);
      }

      $scope.breadCrumbsPieChart = function (step) {
        if (step === 1) {
          var responseValue = responseFirstStepServices.getData();
          firstPieChartInner(responseValue[0], responseValue[1], step);
        }
        if (step === 2) {
          var value = secondPieChartInnerService.getData();
          secondPieChartInner(value[0], value[1]);
        }
      };
    }]);
