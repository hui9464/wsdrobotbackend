import { Template } from 'meteor/templating';
import { ListenStatus } from '../../../imports/api/listenStatus';
import './voiceListen.html';

Template.voiceListen.helpers({
    listenTxt() {
        return ListenStatus.find({});
    },
    title() {
        return `谈话列表展示`;
    }
});

Template.voiceListen.events({
    'click .test'() {
        console.log(ListenStatus);
    },

    'click .delete'() {
        var msgid = ListenStatus.findOne(this._id).msgid;
        Meteor.call('listenStatus.remove', msgid);
    },
});