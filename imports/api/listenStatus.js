'use strict';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import { isNullOrUndefined } from '../helper';
import { SPEAKSTATUS } from '../const';
export const ListenStatus = new Mongo.Collection('listenStatus');


if (Meteor.isServer) {
    ListenStatus._ensureIndex({ msgid: 1 });
    let myLogger = require('../../server/common/log4js').log4js.getLogger('listenStatus.js');

    Meteor.publish('listenStatus', (count) => {
        if (count == 1) {
            return ListenStatus.find();
        }   
    });

    Meteor.methods({
        'listenStatus.updateSpeakStatus'(msgid, status, sayMessage, errorMsg) {
            myLogger.debug(`listenStatus.updateSpeakStatus : msgid=${msgid} status=${status} sayMessage=${sayMessage} errorMsg=${errorMsg}`);
            check(msgid, String);
            check(status, Number);
            check(sayMessage, Match.Maybe(String));
            check(errorMsg, Match.Maybe(String));
            let result = ListenStatus.findOne({ 'msgid': msgid });
            if (result) {
                myLogger.info(`listenStatus.updateSpeakStatus ${msgid} is exist,update to new value`);
                let updateObj = {};
                updateObj.status = status;
                if (!isNullOrUndefined(sayMessage)) updateObj.sayMessage = sayMessage;
                if (!isNullOrUndefined(errorMsg)) updateObj.errorMsg = errorMsg;
                if (-1 !== _.indexOf([SPEAKSTATUS.RecognizeSucc.value, SPEAKSTATUS.RecognizeFailed.value], status)) {
                    updateObj.endTime = new Date();
                }
                ListenStatus.update({ msgid: msgid }, { $set: updateObj }, {}, (err, effectNum) => {
                    if (err) {
                        myLogger.error(`listenStatus.updateSpeakStatus : listenStatus.update error : ${err.message}`);
                        return false;
                    }
                    myLogger.info(`listenStatus.updateSpeakStatus : listenStatus.update successful : ${effectNum}`);
                    return true;
                })
            } else {
                myLogger.info(`listenStatus.updateSpeakStatus ${msgid} does not exist,insert new collection`);
                let id = ListenStatus.insert({
                    msgid: msgid, status: status, sayMessage: sayMessage, errorMsg: null, startTime: new Date(), endTime: null, resultID: null
                }, (err, _id) => {
                    if (err) {
                        myLogger.error(`listenStatus.updateSpeakStatus : listenStatus.insert error : ${err.message}`);
                        return false;
                    }
                    myLogger.info(`listenStatus.updateSpeakStatus : listenStatus.insert successful : _id = ${_id}`);
                    return true;
                });
            }
        },
        'listenStatus.remove'(msgids) {
            check(msgids, String);

            var msgObject = ListenStatus.findOne({ "msgid": msgids });
            ListenStatus.remove(msgObject);
        },
    });


}