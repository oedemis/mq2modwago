import { Meteor } from 'meteor/meteor';
import '../imports/api/wago_connect.js';

//var mqtt = Meteor.require("mqtt");
import mqtt from 'mqtt';
const client  = mqtt.connect('mqtt://10.210.10.29');

Meteor.publish("mqttMessages", function() {
    return Messages.find({}, {sort: {ts: -1}, limit: 1});
});

let value;
client.subscribe('soc');
client.on('message', (topic, message) => {
	  //value = message.toString();
	  //console.log(message.toString());

	  var msg = {
            message: message.toString(),
            topic: topic,
            ts: new Date()
      };
      // add the message to the collection (see below...)
      addMsgToCollection(msg);
});

var addMsgToCollection = Meteor.bindEnvironment(function(message) {
	//console.log(message);
    Messages.insert(message);
});

Meteor.startup(() => {
   Messages.remove({});

  Meteor.methods({
  	'wago.setActivePower' (value) {
    	client.publish("si/activepower", value);
	},
	'wago.setUpperState' (value) {
		client.publish("si/upperstate", value);
	},
	'wago.setLowetState' (value) {
		client.publish("si/lowerstate", value);
	},
	'wago.activate' () {
		client.publish("si/activate", "802");
	},
	'wago.deactivate' () {
		client.publish("si/deactivate", "803");
	}
  });
});


// delete every 120 seconds old data (messages) from the collection/mongodb
Meteor.setInterval(function() {
    Messages.remove({});
}, 2*60*1000);