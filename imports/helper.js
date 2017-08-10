'use strict';

function isNullOrUndefined(checkData){
    return _.isNaN(checkData)||_.isUndefined(checkData);
}

module.exports.isNullOrUndefined = isNullOrUndefined;