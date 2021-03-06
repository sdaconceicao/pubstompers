/* $, global angular, module, require */
'use strict';

function navMenu($window){
    return {
        templateUrl: 'nav-menu/nav-menu.html',
        restrict: 'E',
        replace: true,
        link: function postLink(scope, element, attxr) {
            $(document).ready(function(){
                let navTop = $(element).offset().top;
                $(element).find('a').on('click', function() {
                    let target = $(this.hash);
                    $('html,body').animate({
                        scrollTop: target.offset().top - $(element).height()
                    }, 1000);
                    return false;
                });

                angular.element($window).bind("scroll", function() {
                    let scrollTop = $(window).scrollTop();
                    $('.container').each( function() {
                        let topOfElement = $(this).offset().top,
                            topView = $(window).scrollTop(),
                            bottomView = topView + $(window).height();
                        if( (bottomView >= topOfElement) ){
                            scope.active = $(this).attr('id');
                        }
                    });
                    scope.$apply();
                    if (scrollTop > navTop) {
                        $(element).find('ul').css({ 'position': 'fixed', 'top':0, 'left':0 });
                    } else {
                        $(element).find('ul').css({ 'position': 'relative' });
                    }
                });
            });
        }
    };
}

module.exports = angular.module('pub.navMenu', [])
    .directive('navMenu', navMenu)
;;
