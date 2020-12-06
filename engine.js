const parser = require('./src/parser');
const query_solution = require('./src/solver');
const path = __dirname + '/' + process.argv[2];

try {
	const { parsed, facts } = parser(process.cwd() + '/' + process.argv[2]);
	console.log("\n\n------------------------ PARSED\n\n")
	console.log(JSON.stringify(parsed, null, 4));
	console.log("\n\n------------------------ FACTS\n\n")
	console.log(facts);
	console.log("\n\n------------------------ RESULTS\n\n");
	parsed.rules.forEach((rule) => { // TODO: A VIRER APRES
		rule.hash = "default";
	});
	parsed.queries.forEach((query) => {
		let rules = Object.assign({}, parsed.rules);
		console.log(query.label+ " - " + query_solution(query, rules, facts));
	});
} catch (error) {
	console.log("\x1b[31m%s\x1b[0m", error);
}
