[![Bower version](https://badge.fury.io/bo/angular-battery.svg)](http://badge.fury.io/bo/angular-battery)

# ngBattery

A tiny AngularJS service over the tiny JavaScript wrapper for the [HTML5 Battery Status API](http://www.w3.org/TR/battery-status/).

As of November 2014 the Battery Status API is supported by Firefox and Chrome: http://caniuse.com/battery-status

## Usage

```javascript
var app = angular.module('myModule', ['ngBattery']);
app.directive('myCoolBatteryDirective', function(battery){
  return {
    link: function($scope) {
      battery.onUpdate(function() {
        $scope.$evalAsync(function(status) {
          $scope.batteryStatus = status;
        });
      });
    }
  };
});
```