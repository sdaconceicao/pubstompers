'use strict';

describe('Login Module', function(){

    describe('Login Ctrl', function(){
        var $controller, ctrl;
        beforeEach(module('him.login'));
        beforeEach(inject(function(_$controller_){
            $controller = _$controller_;
            ctrl = $controller('LoginCtrl', { $scope: $scope });
        }));

        it('initially has no user defined', function(){
            expect(ctrl.user).toBeNull();
        })
    });

})
