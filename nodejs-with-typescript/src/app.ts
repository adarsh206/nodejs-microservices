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
