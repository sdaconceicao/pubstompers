/* global module, require */
'use strict';

let templates = require('../dist/templates'),
    components = require('./components/components'),
    home = require('./modules/home/home'),
    dependencies = ['ngAnimate', 'ui.router', 'mm.foundation',
        'pub.templates', components.name, home.name
    ]
;

angular.module('pub', dependencies)
    .config(['$locationProvider', '$urlRouterProvider', '$compileProvider',
        function($locationProvider, $urlRouterProvider, $compileProvider){
        $locationProvider.html5Mode({enabled: true, requireBase: false});
        $urlRouterProvider.otherwise('/home');
        $compileProvider.debugInfoEnabled(false);
    }])
    .run(['$templateCache', function ($templateCache){

    }])
;
