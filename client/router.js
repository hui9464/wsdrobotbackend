'use strict';
import './templates/load/load.html';
import './layout/layoutSinglePage.html';
Router.route('/voiceListen', {
    loadingTemplate: 'load',
    layoutTemplate: 'layoutSinglePage',
    waitOn: function () {
        return Meteor.subscribe('listenStatus');
    },
    action: function () {
        this.render('voiceListen');
    }
});