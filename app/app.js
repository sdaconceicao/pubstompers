/* global module, require */
'use strict';

let templates = require('../dist/templates'),
    constants = require('./config/constants'),
    components = require('./components/components'),
    home = require('./modules/home/home'),
    memberCard = require('./modules/member-card/member-card'),
    dependencies = ['ngAnimate', 'ui.router', 'ui.bootstrap',
        'pub.templates', 'pub.constants', components.name, home.name, memberCard.name
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
