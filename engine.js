const parser = require('./src/parser');
const query_solution = require('./src/solver');
const path = __dirname + '/' + process.argv[2];
const { parsed, facts } = parser(process.cwd() + '/' + process.argv[2]);

console.log("\n\n------------------------ PARSED\n\n")
console.log(JSON.stringify(parsed, null, 4));
console.log("\n\n------------------------ FACTS\n\n")
console.log(facts);

console.log("\n\n------------------------ RESULTS\n\n");
try {
	parsed.queries.forEach((query) => {
		console.log(query.label+ " - " + query_solution(query, parsed.rules, facts));
	});
} catch (error) {
	console.log("\x1b[31m%s\x1b[0m", error);
}
