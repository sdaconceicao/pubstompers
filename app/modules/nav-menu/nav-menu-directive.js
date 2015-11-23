/* $, global angular, module, require */
'use strict';

function navMenu(){
    return {
        templateUrl: 'nav-menu/nav-menu.html',
        restrict: 'E',
        replace: true,
        link: function postLink(scope, element, attr) {
            $(document).ready(function(){
                let nav_top = $(element).offset().top;
                $(element).find('a').on('click', function() {
                    let target = $(this.hash);
                    $('html,body').animate({
                        scrollTop: target.offset().top - $(element).height()
                    }, 1000);
                    return false;
                });

                $(window).scroll(function(){
                    let scroll_top = $(window).scrollTop();
                    if (scroll_top > nav_top) {
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
