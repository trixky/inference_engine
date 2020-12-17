const parser = require('./src/parser');
const query_solution = require('./src/solver');

try {
	if	(process.argv.length != 3)
		throw "usage: node app.js [*.txt]";
	const { parsed, facts } = parser(process.cwd() + '/' + process.argv[2]);
	parsed.queries.forEach((query) => {
		parsed.rules.forEach((rule) => {
			rule.hash = "default";
		});
		console.log(query.label+ " - " + query_solution(query, parsed.rules));
	});
} catch (error) {
	console.log("\x1b[31m%s\x1b[0m", error);
}
