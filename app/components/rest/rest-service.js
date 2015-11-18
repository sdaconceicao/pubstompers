/* global module, angular*/
'use strict';

class RestService{
    constructor($http, $q){
        this.http = $http;
        this.q = $q;
    }
    call(config){
        var deferred = this.q.defer(), svc = this;

        this.http(config)
            .then( function(response) {
                svc.successHandler(deferred, config, response)
            })
            .catch( function(response) {
                svc.errorHandler(deferred, config, response)
            });

        return deferred.promise;
    }
    successHandler(deferred, config, response){
        if (response.data.status !== 'ok'){
            this.errorHandler(deferred, config);
        }
        deferred.resolve(response);
    }
    errorHandler(deferred, config, response){
        deferred.reject(response);
    }

}

module.exports = angular.module('him.components.rest', [])
    .service('RestService', RestService)
;
