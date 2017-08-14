'use strict';
import './templates/load/load.html';
import './layout/layoutSinglePage.html';

import { Template } from 'meteor/templating';

Router.route('/voiceListen',{
    loadingTemplate:'load',
    layoutTemplate:'layoutSinglePage',
    waitOn:function (){
        return Meteor.subscribe('listenStatus', 1);
    },
    action:function(){
        this.render('voiceListen');
    }
});