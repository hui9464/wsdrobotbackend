import { Template } from 'meteor/templating';
import { BtnStatus } from '../../../imports/api/btnStatus';
import './btn.html';

Template.btn.helpers({
    title() {
        return `按钮`;
    },
});


Template.btn.events({
    'click .btnStartRecog'() {
        var btnID = "btnStartRecog";
        Meteor.call('btnStatus.update', btnID, "开始识别", 0, "1");
    },
    'click .btnStopRecog'() {
        var btnID = "btnStopRecog";
        Meteor.call('btnStatus.update', btnID, "停止识别", 0, "1");
    },
    'click .btnStartTts'() {
        var btnID = "btnStartTts";
        Meteor.call('btnStatus.update', btnID, "开始说话", 0, "1");
    },
    'click .btnStopTts'() {
        var btnID = "btnStopTts";
        Meteor.call('btnStatus.update', btnID, "暂停说话", 0, "1");
    },

});