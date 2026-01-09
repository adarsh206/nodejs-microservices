
// callbacks are functions that are passed as arguments to other functions.
// It allows to defer the execution of a code until after an asynchronous operation has completed.


const fs = require('fs')

function person(name, callbackFn){

    console.log(`Hello ${name}`)
    callbackFn();
}

function address(){
    console.log("India");
    
}

person("Adarsh Kumar", address);

//Example for callback function
fs.readFile('input.txt', 'utf8', (err, data) => {
    if(err) {
        console.log("Error reading file", err);
        return;
    }
    console.log(data);
})