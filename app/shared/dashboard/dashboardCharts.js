'use strict';

angular.module('uiQaninjasApp')
  .directive('hcPie', function (DashboardChartService, $location) {
    return {
      restrict: 'C',
      replace: true,
      scope: {
        items: '='
      },
      controller: 'DashboardController',
      template: '<div id="container" style="margin: 0 auto">not working</div>',
      link: function (scope, element, attrs) {
        var chart = new Highcharts.Chart({
          chart: {
            renderTo: 'container',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          //turn off title for chart
          title: false,
          //disable export menu
          exporting: {
            enabled: false
          },
          //disable highcharts navigate url
          credits: {
            enabled: false
          },
          //disable legend
          legend: {
            enabled: false
          },
          tooltip: {
            formatter: function () {
              return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 2) + ' %';
            },
            percentageDecimals: 0
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
                color: '#000000',
                connectorColor: '#000000',
                formatter: function () {
                  return '<b>' + this.point.name + '</b>: ' + Highcharts.numberFormat(this.percentage, 2) + ' %';
                }
              },
              events: {
                click: function (event, i) {
                  chartNavigationFunc(event.point.name);
                }
              }
            }
          },
          series: [{
            type: 'pie',
            name: 'Components',
            data: scope.items
          }]
        });
        scope.$watch("items", function (newValue) {
          chart.series[0].setData(newValue, true);
        }, true);
      }
    };
    function chartNavigationFunc(val){
      DashboardChartService.setData(val);
      console.log(val);
    }
  });

