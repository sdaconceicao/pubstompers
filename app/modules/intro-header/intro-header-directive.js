/* $, global angular, module, require */
'use strict';

function introHeader(){
    return {
        templateUrl: 'intro-header/intro-header.html',
        restrict: 'E',
        replace: true,
        controller: ['teams', IntroHeaderCtrl],
        controllerAs: 'ctrl',
        bindToController: true,
        link: function postLink(scope, element, attr) {
            let fadeInElement = $(element).find('[fade-in]');
            fadeInElement.animate({'opacity':'1'}, fadeInElement.attr('fade-in'));
        }
    };
}

class IntroHeaderCtrl{
    constructor(teams){
        this.teams = teams;
        this.currentTeam = _.find( this.teams, { 'current': true });
    }
}

module.exports = angular.module('pub.introHeader', [])
    .directive('introHeader', introHeader)
;
