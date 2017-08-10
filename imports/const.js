'use strict';

const SPEAKSTATUS = {
    begainTalk:{
        name:'说话开始',
        value:0
    },
    Talking:{
        name:'倾听中',
        value:1
    },
    Recognition:{
        name:'识别中',
        value:2
    },
    RecognizeSucc:{
        name:'识别成功',
        value:3
    },
    RecognizeFailed:{
        name:'识别失败',
        value:4
    }
}

module.exports.SPEAKSTATUS = SPEAKSTATUS;