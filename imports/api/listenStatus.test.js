import { Meteor } from 'meteor/meteor';
import { ListenStatus } from './listenStatus';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

if(Meteor.isServer){
    console.log('1.-------->');
    describe('listenStatus',()=>{
        console.log('2.-------->');
        describe('methods',()=>{
            
            it.only('can insert  or update new data',()=>{
                console.log('3.-------->');
                const updateSpeakStatusMethod = Meteor.server.method_handlers['listenStatus.updateSpeakStatus'];
                let randomId = Random.id();
                updateSpeakStatusMethod.apply(null,[randomId,0]);
                updateSpeakStatusMethod.apply(null,[randomId,3,'aaaa']);
                
                const results = ListenStatus.find({msgid:randomId});
                results.forEach((data)=>{
                    console.dir(data);
                });
                assert.equal(results.count(), 1);
            });
    
    /*
            it('can update new data',()=>{
                console.log('4.-------->');
                const updateSpeakStatusMethod = Meteor.server.method_handlers['listenStatus.updateSpeakStatus'];
                let randomId = Random.id();
                updateSpeakStatusMethod.apply(null,[randomId,0]);
                updateSpeakStatusMethod.apply(null,[randomId,3,'tester']);
                const results = ListenStatus.find({msgid:randomId});
                results.forEach((data)=>{
                    console.dir(data);
                });
                assert.equal(results.count(), 1);
            });*/



        });

    });

}