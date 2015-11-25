/* global angular, module, require */
'use strict';

class HomeController {
    constructor(ExtraLifeService, teams){
        this.ExtraLifeService = ExtraLifeService;
        this.teamId = _.find( teams, { 'current': true }).teamId;
        this.loading = true;
        this.init();
    }
    init(){
        this.ExtraLifeService.getTeam(this.teamId)
            .then((teamInfo) => {
                this.teamInfo = teamInfo;
                return this.ExtraLifeService.getTeamMembers(this.teamId);
                }, function(error){
                    this.error = true;
                }
            )
            .then((members) => {
                this.loading = false;
                this.members = members;
            });
    }
}



module.exports = HomeController;
