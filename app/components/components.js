/* global angular, module, require */
'use strict';

let restSvc = require('./rest/rest-service')
;

module.exports = angular.module('him.components', [restSvc.name])
;
