/* global angular, module, require */
'use strict';

let ctrl = require('./login-controller'),
    svc = require('./login-service')
;

module.exports = angular.module('him.login', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'content@': {
                    templateUrl: 'login/login.html',
                    controller: 'LoginCtrl as vm'
                }
            },
            data: {}
        })
    }])
    .controller('LoginCtrl', ctrl)
    .service('LoginService', svc)
;
