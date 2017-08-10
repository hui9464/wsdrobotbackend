const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'stdout',layout: { type: 'colored' } },
    app: { type: 'file', filename:  'robot.log'}
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'debug' }
  }
});

module.exports.log4js = log4js;