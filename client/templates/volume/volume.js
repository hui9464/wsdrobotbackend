import { Template } from 'meteor/templating';
import { ListenVolumes } from '../../../imports/api/listenVolumes';
import './volume.html';

Template.volume.helpers({
    listenVol() {
        return ListenVolumes.findOne({volid: "vol"});
    },
    title() {
        return `音量`;
    }
});

Template.volume.events({
    'click .volBtn'() {
        var vol = ListenVolumes.findOne({volid: "vol"}).volume;
        console.log(vol);
    },

});