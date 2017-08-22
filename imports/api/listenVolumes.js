'use strict';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { isNullOrUndefined } from '../helper';

export const ListenVolumes = new Mongo.Collection('listenVolumes');

if (Meteor.isServer) {
    let myLogger = require('../../server/common/log4js').log4js.getLogger('listenVolumes.js');

    Meteor.publish('listenVolumes', (count) => {
        if (count == 1) {
            return ListenVolumes.find();
        }
    });

    Meteor.methods({
        'listenVolume.updateVolume'(volids, volumes) {
            check(volids, String);``
            check(volumes, Number);

            let result = ListenVolumes.findOne({ 'volid': volids });
            if (result) {
                myLogger.info(`更新数据，id： ${volids} value： ${volumes}`);
                ListenVolumes.update({volid: volids}, {$set: {volume : volumes, createdAt: new Date()},});
            } else {
                myLogger.info(`插入数据，id： ${volids} value： ${volumes}`);
                ListenVolumes.insert({
                    volid: volids, 
                    volume: volumes, 
                    createdAt: new Date()
                }, (err, _id) => {
                    myLogger.info(`插入成功， _id = ${_id}`);
                });
            }
        },

    });
}