/* global angular, module, require */
'use strict';

let homeCtrl = require('./home-controller');

module.exports = angular.module('pub.home', [])
    .controller('HomeController', homeCtrl)
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'content@': {
                        templateUrl: 'home/home.html',
                        controller: 'HomeController as ctrl'
                    }
                },
                data: {}
            })
    }])
;
