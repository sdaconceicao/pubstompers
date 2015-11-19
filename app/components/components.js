/* global angular, module, require */
'use strict';

let restSvc = require('./rest/rest-service'),
    extraLifeSvc = require('./extra-life/extra-life-service')
;

module.exports = angular.module('him.components', [restSvc.name, extraLifeSvc.name])
;
