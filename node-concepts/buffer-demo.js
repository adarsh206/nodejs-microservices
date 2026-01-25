// Buffer concepts :
//objects -> handle binary data
// uses -> file system operations, cryptography, image processing

const buffOne = Buffer.alloc(10); //allocate a buffer of 10 bytes -> zeros
console.log(buffOne);

const bufferFromString = Buffer.from("Hello");
console.log(bufferFromString);

const bufferFromArrayOfIntegers = Buffer.from([0, 1, 2, 3, 4, 5]);
console.log(bufferFromArrayOfIntegers);

buffOne.write("Adarsh");
console.log("After writing Node js to buffOne", buffOne.toString());

console.log(bufferFromString[0]); // prints ASCII value of H -> 72

console.log(bufferFromString.slice(0, 3));

const concatBuffs = Buffer.concat([buffOne, bufferFromString]);
console.log(concatBuffs);

console.log(concatBuffs.toJSON());