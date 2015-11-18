/* global module, angular */
'use strict';


class LoginService {
    constructor(RestService){
        this.RestService = RestService;
    }
    toString(){
        return 'LoginService';
    }
    login(user){
        return this.RestService.call(
            {
                url: '/login',
                params: {
                    username: user.username,
                    password: user.password
                }
            }
        );
    }
}

module.exports = LoginService;
