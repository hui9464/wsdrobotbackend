'use strict';
import './templates/load/load.html';
import './layout/layoutSinglePage.html';

import { Template } from 'meteor/templating';

Router.route('/voiceListen',{
    loadingTemplate:'load',
    layoutTemplate:'layoutSinglePage',
    waitOn:function (){
        Meteor.subscribe('listenStatus', 1);
        Meteor.subscribe('listenVolumes', 1);
    },
    action:function(){
        this.render('voiceListen', {to: 'voiceModule'});
        this.render('volume', {to: 'volumeModule'});
    }
});