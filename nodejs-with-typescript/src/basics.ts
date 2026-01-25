console.log("Hello Nodejs from typescript");

function getName(name : string) {
    return name;
}

console.log(getName("Adarsh"));


// basic types

let isDone : boolean = false;
let num : number = 100;
let str : string = "Adarsh";

let list : number[] = [1, 2, 3, 4];
let list2 : Array<number> = [1, 2, 3, 4];

let randomValue : any = 10;

randomValue = true;
randomValue = "Adarsh";
randomValue = [];

let xyz : undefined = undefined;
let xy : null = null;

enum Color {
    Red, Green, Blue
}

let d : Color = Color.Red;
console.log(d);


// tuple
let abs : [string, number] = ["Adarsh", 100];
console.log(abs);

// interfaces, types
// interfaces shapes your data

interface User {
    name : String,
    id: number,
    email? : string // optional property
    readonly createdAt : Date
}

const user : User = {
    name : "Adarsh",
    id : 1,
    createdAt : new Date()
}

console.log(user);

// type 

type Product = {
    title : string,
    price : number
}

const product1 : Product = {
    title : "Product 1",
    price : 1000
}

console.log(product1);

// module.exports -> export
// require() -> import


// functions with types annotations

function multiply(a : number, b : number) : number {
    return a * b;
}

const add = (num1 : number, num2 : number) : number => {
    return num1 + num2;
} 

function greet(name : string, greeting? : string) : string {
    return `${name} ${greeting = 'Hello'}`
} 

console.log(greet('Adarsh' , 'Hello'))