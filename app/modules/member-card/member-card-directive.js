/* global angular, module, require */
'use strict';

function memberCard(){
    return {
        templateUrl: 'member-card/member-card.html',
        controller: ['ExtraLifeService', MemberCardCtrl],
        controllerAs: 'ctrl',
        bindToController: true,
        restrict: 'E',
        replace: false,
        scope: {
            member: '='
        }
    };
}

class MemberCardCtrl{
    constructor(ExtraLifeService){
        this.ExtraLifeService = ExtraLifeService;
        this.loading = true;
        this.init();
    }
    init(){
        this.ExtraLifeService.getMemberDonations(this.member.participantID).then( donations => {
            this.donations = donations;
            this.loading = false;
        });
    }
}

module.exports = memberCard;
