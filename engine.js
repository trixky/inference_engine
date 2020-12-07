const parser = require('./src/parser');
const query_solution = require('./src/solver');
const path = __dirname + '/' + process.argv[2];

try {
	const { parsed, facts } = parser(process.cwd() + '/' + process.argv[2]);
	console.log("\n\n------------------------ PARSED\n\n")
	console.log(JSON.stringify(parsed, null, 4));
	console.log(parsed);
	console.log("\n\n------------------------ FACTS\n\n")
	console.log(facts);
	console.log("\n\n------------------------ RESULTS\n\n");
	parsed.queries.forEach((query) => {
		parsed.rules.forEach((rule) => {
			rule.hash = "default";
		});
		console.log(query.label+ " - " + query_solution(query, parsed.rules));
	});
} catch (error) {
	console.log("\x1b[31m%s\x1b[0m", error);
}
