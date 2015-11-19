/* global module, angular*/
'use strict';

class ExtraLifeService{
    constructor(RestService, api){
        this.RestService = RestService;
        this.api = api;
    }

    getTeam(id){
        return this.RestService.call({
            url: this.api.extralifeUrl + 'donorDrive.team&teamID='+ id
        })
    }
    getTeamMembers(id){
        return this.RestService.call({
            url: this.api.extralifeUrl + 'donorDrive.teamParticipants&teamID='+ id
        })
    }
    getUser(id){
        return this.RestService.call({
            url: this.api.extralifeUrl + 'donorDrive.participant&participantID=' + id
        })
    }

}

module.exports = angular.module('pub.components.extralife', [])
    .service('ExtraLifeService', ExtraLifeService)
;
