
const lodash = require('lodash');

const names = ['adarsh', 'shivam', 'arihant', 'ayush'];

// capitalize the first letter 
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);
