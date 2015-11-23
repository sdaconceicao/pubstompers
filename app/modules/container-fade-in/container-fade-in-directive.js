/* $, global angular, module, require */
'use strict';

function containerFadeIn($window){
    return {
        restrict: 'A',
        replace: false,
        link: function postLink(scope, element, attr) {
            angular.element($window).bind("scroll", function() {
                $('[fade-in]').each( function(i){
                    let topOfElement = $(this).offset().top,
                        bottomOfWindow = $(window).scrollTop() + $(window).height();
                    if( bottomOfWindow > topOfElement + 150 ){
                        $(this).animate({'opacity':'1'}, $(this).attr('fade-in'));
                    }
                });
            });
        }
    };
}

module.exports = angular.module('pub.containerFadeIn', [])
    .directive('containerFadeIn', containerFadeIn)
;
