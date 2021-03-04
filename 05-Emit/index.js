/*
    Events Module 
    NodeJS has a built-in function called "Events"
    where u can create, fire, and listen your own events

    Example 01: for registering, the event will fire only once
    Example 02: create and event emitter instance and register a couple of callbacks
    Example 03: Registering for the event with callback parameters
*/

const EventEmitter = require('events');

const event = new EventEmitter();

event.on("Printer", (statusCode, msg) => {
    console.log(`the status code is ${statusCode} and the page response is ${msg}`)
});

event.emit('Printer', 200, "ok");