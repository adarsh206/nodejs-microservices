

// module.exports
// require

const firstModule = require('./first-module');

console.log(firstModule.add(10, 20));
console.log(firstModule.subtract(20, 10));
console.log(firstModule.divide(20, 10));
console.log(firstModule.multiply(10, 20));


try {
    console.log('trying to divide by zero')
    let result = firstModule.divide(0, 0);
    console.log(result, "result")
} catch (error) {
    console.log('Caught an error', error.message);
    
}


// module wrapper

// (
//     function(exports, require, module, __filename__, __dirname){
//         // your module code goes here
//     }
// )