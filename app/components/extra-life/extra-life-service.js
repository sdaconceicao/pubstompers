/* global module, angular*/
'use strict';

class ExtraLifeService{
    constructor($q, api){
        this.$q = $q;
        this.api = api;
    }

    getTeam(id){
        let deferred = this.$q.defer();
        $.jsonp({
            url: this.api.extralifeUrl + 'donorDrive.team&teamID='+ id,
            corsSupport: false,
            jsonpSupport: false,
            success: (response)=>{
                deferred.resolve(response);
            }});
        return deferred.promise;
    }
    getTeamMembers(id){
        let deferred = this.$q.defer();
        $.jsonp({
            url: this.api.extralifeUrl + 'donorDrive.teamParticipants&teamID='+ id,
            corsSupport: false,
            jsonpSupport: false,
            success: (response)=>{
                deferred.resolve(response);
            }});
        return deferred.promise;
    }
    getMemberInfo(id){
        let deferred = this.$q.defer();
        $.jsonp({
            url: this.api.extralifeUrl + 'donorDrive.participant&participantID=' + id,
            corsSupport: false,
            jsonpSupport: false,
            success: (response)=>{
                deferred.resolve(response);
            }});
        return deferred.promise;
    }
    getMemberDonations(id){
        let deferred = this.$q.defer();
        $.jsonp({
            url: this.api.extralifeUrl + 'donorDrive.participantDonations&participantID=' + id,
            corsSupport: false,
            jsonpSupport: false,
            success: (response)=>{
                deferred.resolve(response);
            }});
        return deferred.promise;
    }
    getDonationUrl(id){
        let deferred = this.$q.defer();
        $.jsonp({
            url: this.api.extralifeUrl + 'donate.participant&participantID=' + id,
            corsSupport: false,
            jsonpSupport: false,
            success: (response)=>{
                deferred.resolve(response);
            }});
        return deferred.promise;
    }

}

module.exports = angular.module('pub.components.extralife', [])
    .service('ExtraLifeService', ExtraLifeService)
;
