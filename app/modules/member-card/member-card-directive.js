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
        this.member.donationUrl = this.ExtraLifeService.getDonationUrl(this.member.participantID);
        this.ExtraLifeService.getMemberDonations(this.member.participantID)
        .then( donations => {
            this.donations = donations;
            return this.ExtraLifeService.getMemberInfo(this.member.participantID);
        })
        .then( info => {
            this.member.info = info;
            this.loading = false;
        });
    }
}

module.exports = memberCard;
