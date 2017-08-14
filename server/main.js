import { Meteor } from 'meteor/meteor';
import '../imports/api/listenStatus';


Meteor.startup(() => {
  // code to run on server at startup
  // Meteor.call('listenStatus.updateSpeakStatus', '1001', 1, '你好！我是测试的', 'error');
});
