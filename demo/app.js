'use strict';

(function(angular, $) {
    var demo = angular.module('ngBatteryDemo', ['ngBattery']);

    demo.directive('batteryDemo', ['battery', function(battery) {
        return {
            link: function() {
                  var $level = $('#battery-level');
                  var updateStatus = function(status, error) {
                    if(error) {
                      $('#not-supported').show();
                      return;
                    }
                    var level = Math.floor(status.level * 100);
                    $level.toggleClass('charging', !!(status.charging || status.target.charging));
                    $level.toggleClass('plugged', status.dischargingTime === Infinity);
                    $level.css({'width': level + '%'});
                    $level.toggleClass('low', level <= 20);
                  };

                  battery.getStatus(updateStatus);
                  battery.onUpdate(updateStatus);
            }
        };
    }]);
}(window.angular, window.$));