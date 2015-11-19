/* global angular, module, require */
'use strict';

class HomeController {
    constructor(ExtraLifeService, teams){
        this.ExtraLifeService = ExtraLifeService;
        this.teamId = teams[0].teamId;
        this.ExtraLifeService.getTeam(this.teamId)
            .then((teamInfo) => {
                this.teamInfo = teamInfo;
                return this.ExtraLifeService.getTeamMembers(this.teamId);
            }, function(error){
                this.error = true;
            })
            .then((members) => {
                console.log(members);
                this.members = members;
            });
    }

}

module.exports = HomeController;
