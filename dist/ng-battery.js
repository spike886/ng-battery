/**
 ** ng-battery - A simple AngularJS component for the Battery Web API
 ** @author Andrei Cacio
 ** @version v0.0.1
 **/
/* global angular */

(function() {
	'use strict';

	var ngBattery = angular.module('ngBattery', []);

	var _events = 'chargingchange chargingtimechange dischargingtimechange levelchange',
		_battery = navigator.battery || navigator.mozBattery || navigator.getBattery,
		_status = null,
		_statusCallback = function() {},
		_updateCallback = function() {};

	function eventHandler(status) {
		_status = status.target;
		_updateCallback(_status);
	  }

	  function registerEventHandler(battery) {
			for(var evt in _events.split(' ')) {
			  battery.addEventListener(_events.split(' ')[evt], eventHandler);
			}
	  }

	  if(_battery instanceof Function) {
		_battery.call(navigator)
		  .then(function(status) {
				_status = status;
				_statusCallback(_status);
				registerEventHandler(_status);
		  }, function() {
				_status = 'not supported';
		  });
	  } else if(_battery) {
			_status = _battery;
			registerEventHandler(_battery);
	  } else {
			_status = 'not supported';
	  }

	ngBattery.service('battery', function() {
	  /** Function: getStatus
	   * Register callback function to retrieve status
	   *
	   * Parameters:
	   * (Function) fn(status, error) - callback function
	   */
	  this.getStatus = function(fn) {
			if(_status === 'not supported') {
			  fn(null, _status);
			} else if(_status) {
			  fn(_status);
			} else {
			  _statusCallback = fn;
			}
	  };

	  /* Function: onUpdate
	   * Register callback function when battery status changes
	   *
	   * Parameters:
	   * (Function) fn(status) - callback function
	   */
	  this.onUpdate = function(fn) {
			_updateCallback = fn;
	  };
	});
}());
