/* global angular, module, require */
'use strict';

let memberCardDir = require('./member-card-directive');

module.exports =  angular.module('pub.memberCard', [])
    .directive('memberCard', memberCardDir)
;
