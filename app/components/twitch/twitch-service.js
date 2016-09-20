/* global module, angular*/
'use strict';

class TwitchService{
    /* @ngInject */
    constructor(RestService, api, twitch){
        this.RestService = RestService;
        this.api = api;
        this.twitch = twitch;
    }

    getStreams(){
        return this.RestService.call({
            url: `${this.api.twitchUrl}/streams/${this.twitch.name}`,
            headers: {'Client-ID': this.twitch.clientId}
        });
    }

}

module.exports = angular.module('pub.components.twitch', [])
    .service('TwitchService', TwitchService)
;
