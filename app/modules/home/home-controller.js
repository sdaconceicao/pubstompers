/* global angular, module, require */
'use strict';

class HomeController {
    constructor(ExtraLifeService, TwitchService, teams){
        this.ExtraLifeService = ExtraLifeService;
        this.TwitchService = TwitchService;
        this.teams = teams;
        this.init();
    }
    init(){
        this.teamId = _.find( this.teams, { 'current': true }).teamId;
        this.loading = true;

        this.slides = [
            {image : 'styles/images/gallery1.jpg', text: 'Team playing King of Tokyo, 2015 Marathon Day'},
            {image : 'styles/images/gallery2.jpg', text: 'Team playing 8 Minute Empire, 2015 Marathon Day'},
            {image : 'styles/images/gallery3.jpg', text: 'Team playing BlazBlue, 2015 Marathon Day'}
        ];

        this.ExtraLifeService.getTeam(this.teamId)
            .then((teamInfo) => {
                this.teamInfo = teamInfo;
                return this.ExtraLifeService.getTeamMembers(this.teamId);
                }, (error) => {
                    this.error = true;
                }
            )
            .then((members) => {
                this.loading = false;
                this.members = members;
            });
        this.TwitchService.getStreams()
            .then((streams) =>{
                this.streams = streams;
            });
    }
}



module.exports = HomeController;
