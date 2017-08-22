'use strict';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { isNullOrUndefined } from '../helper';

export const BtnStatus = new Mongo.Collection('btnStatus');

if (Meteor.isServer) {
    let myLogger = require('../../server/common/log4js').log4js.getLogger('btnStatus.js');

    Meteor.publish('btnStatus', (count) => {
        if (count == 1) {
            return BtnStatus.find();
        }
    });

    Meteor.methods({
        'btnStatus.update'(btnIDs, btnName, count, btnStatus) {
            check(btnIDs, String);
            check(btnName, String);
            check(count, Number);
            check(btnStatus, String);

            let result = BtnStatus.findOne({ 'btnID': btnIDs });
            if (result) {
                myLogger.info(`更新数据，id： ${btnIDs} value：${btnName}, ${count}, ${btnStatus}`);
                BtnStatus.update({ btnID: btnIDs }, { $set: { btnName: btnName, count: count, btnStatus: btnStatus, createdAt: new Date() },}, 
                    (err, _id) => {
                        myLogger.info(`更新成功数据， _id = ${_id}`);
                });
            } else {
                myLogger.info(`插入数据，id： ${btnIDs} value：${btnName}, ${count}, ${btnStatus}`);
                BtnStatus.insert({
                    btnID: btnIDs,
                    btnName: btnName,
                    count: count,
                    btnStatus: btnStatus,
                    createdAt: new Date()
                }, (err, _id) => {
                    myLogger.info(`插入成功， _id = ${_id}`);
                });
            }
        },

    });
}