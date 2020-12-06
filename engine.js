const parser = require('./src/parser');
const path = __dirname + '/' + process.argv[2];
const { parsed, facts } = parser(process.cwd() + '/' + process.argv[2]);

console.log("\n\n------------------------ PARSED\n\n")
console.log(JSON.stringify(parsed, null, 4));
console.log("\n\n------------------------ FACTS\n\n")
console.log(facts);
