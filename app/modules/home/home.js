/* global angular, module, require */
'use strict';

module.exports = angular.module('him.home', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    'content@': {
                        templateUrl: 'home/home.html'
                    }
                },
                data: {}
            })
    }])
;
