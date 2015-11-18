/* global module, angular */
'use strict';

class LoginCtrl {
    constructor($state, LoginService){
        this.state = $state;
        this.LoginService = LoginService;
    }
    toString(){
        return 'LoginCtrl';
    }
    onSuccess(result){
        this.state.go('/dashboard')
    }
    onError(result){
        this.error = result;
    }
    login (){
        this.LoginService.login({username: this.username, password: this.password}).
            then(this.onSuccess.bind(this), this.onError.bind(this));
    }
}

module.exports = LoginCtrl;
