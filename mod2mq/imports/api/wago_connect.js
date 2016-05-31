import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

//Messages = new Meteor.Collection("mqtt-messages");

Messages = new Mongo.Collection('mqttmessages');

