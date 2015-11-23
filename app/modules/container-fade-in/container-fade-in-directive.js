/* $, global angular, module, require */
'use strict';

function containerFadeIn($window){
    return {
        restrict: 'A',
        replace: false,
        link: function postLink(scope, element, attr) {
            angular.element($window).bind("scroll", function() {
                $('[fade-in]').each( function(i){
                    let top_of_object = $(this).offset().top,
                        bottom_of_window = $(window).scrollTop() + $(window).height();
                    //console.log('bottom_of_object' + top_of_object + ' bottom_of_window ' + bottom_of_window);
                    if( bottom_of_window > top_of_object + 150 ){
                        console.log('show element ' + $(this).attr('id'));
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
