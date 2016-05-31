<<<<<<< HEAD
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-var';

import './body.html';
import '../api/wago_connect.js';


Meteor.subscribe("mqttMessages");
Template.body.onCreated(function bodyOnCreated() {
	this.buttonActivateStateDisabled = new ReactiveVar(false);
	this.buttonDectivateStateDisabled = new ReactiveVar(true);
});

Template.body.helpers({
  socs() {
  	return Messages.find({}, {sort: {ts: -1}, limit: 1});
  },
  buttonActivateStateDisabled () { return Template.instance().buttonActivateStateDisabled.get(); },
  buttonDectivateStateDisabled () { return Template.instance().buttonDectivateStateDisabled.get(); },
});


Template.body.events({
  "click .activate" (event, instance) {
  	//event.preventDefault();
  	instance.buttonActivateStateDisabled.set(true);
  	if (instance.buttonActivateStateDisabled.get()) {
  		instance.buttonDectivateStateDisabled.set(false);
  	}
  	Meteor.call('wago.activate');
  	//setTimeout(function() { instance.buttonActivateStateDisabled.set(false); }, 2000);

  	setTimeout(function() { 
  		instance.buttonDectivateStateDisabled.set(true); 
  		alert("nach 60min nochmal aktivieren");
  		instance.buttonActivateStateDisabled.set(false);
  	}, 3.6e+6);
  },
  "click .deactivate" (event, instance) {
  	instance.buttonDectivateStateDisabled.set(true);
  	instance.buttonActivateStateDisabled.set(false);

  	Meteor.call('wago.deactivate');  	
  },
  "submit .setActivePower" (event) {
  	event.preventDefault();
    const target = event.target;
    const text = target.activePower.value;
  	Meteor.call('wago.setActivePower', text);
  },

  "submit .setUpperState" (event) {
  	event.preventDefault();
    const target = event.target;
    const text = target.upperState.value;
  	Meteor.call('wago.setUpperState', text);
  },

  "submit .setLowerState" (event) {
  	event.preventDefault();
    const target = event.target;
    const text = target.lowerState.value;
  	Meteor.call('wago.setLowetState', text);
  }
});
||||||| merged common ancestors
=======
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { ReactiveDict } from 'meteor/reactive-var';

import './body.html';
import '../api/wago_connect.js';


Meteor.subscribe("mqttMessages");
Template.body.onCreated(function bodyOnCreated() {
	this.buttonActivateStateDisabled = new ReactiveVar(false);
	this.buttonDectivateStateDisabled = new ReactiveVar(true);
});

Template.body.helpers({
  socs() {
  	return Messages.find({}, {sort: {ts: -1}, limit: 1});
  },
  buttonActivateStateDisabled () { return Template.instance().buttonActivateStateDisabled.get(); },
  buttonDectivateStateDisabled () { return Template.instance().buttonDectivateStateDisabled.get(); },
});


Template.body.events({
  "click .activate" (event, instance) {
  	//event.preventDefault();
  	instance.buttonActivateStateDisabled.set(true);
  	if (instance.buttonActivateStateDisabled.get()) {
  		instance.buttonDectivateStateDisabled.set(false);
  	}
  	Meteor.call('wago.activate');
    //setTimeout(function() { instance.buttonActivateStateDisabled.set(false); }, 2000);
  },
  "click .deactivate" (event, instance) {
  	instance.buttonDectivateStateDisabled.set(true);
  	instance.buttonActivateStateDisabled.set(false);
  	Meteor.call('wago.deactivate');
  	//setTimeout(function() { instance.buttonDectivateStateDisabled.set(false); }, 2000);
  },
  "submit .setActivePower" (event) {
  	event.preventDefault();
    const target = event.target;
    const text = target.activePower.value;
  	Meteor.call('wago.setActivePower', text);
  },

  "submit .setUpperState" (event) {
  	event.preventDefault();
    const target = event.target;
    const text = target.upperState.value;
  	Meteor.call('wago.setUpperState', text);
  },

  "submit .setLowerState" (event) {
  	event.preventDefault();
    const target = event.target;
    const text = target.lowerState.value;
  	Meteor.call('wago.setLowetState', text);
  }
});
>>>>>>> af3accc486146600ca457ab8a371f1cf2331355b
