/* global angular, module, require */
'use strict';

class HomeController {
    constructor(ExtraLifeService, teams){
        this.ExtraLifeService = ExtraLifeService;
        this.teamId = _.find( teams, { 'current': true }).teamId;
        this.loading = true;
        this.init();
        this.slides = [
            {image : 'styles/images/gallery1.jpg', text: 'Team playing King of Tokyo, 2015 Marathon Day'},
            {image : 'styles/images/gallery2.jpg', text: 'Team playing 8 Minute Empire, 2015 Marathon Day'},
            {image : 'styles/images/gallery3.jpg', text: 'Team playing BlazBlue, 2015 Marathon Day'}
        ];
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
