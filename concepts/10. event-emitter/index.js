
// emit - emit is used to trigger an event
// on - on is used to add a callback function that's going to be executed when the events is triggered.

const EventEmitter = require('events');

const myFirstEmitter = new EventEmitter();


// register as listener
myFirstEmitter.on('greet', (name) => {
    console.log(`Hello ${name}`)
})

myFirstEmitter.emit('greet', "Adarsh Kumar");