const fs = require('fs');
const peg = require('pegjs');

module.exports = path => {
	const grammar = fs.readFileSync(__dirname + '/grammar.peg', 'utf-8');
	const input = fs.readFileSync(path, 'utf-8');
	const parser = peg.generate(grammar);
	
	try {
		const parsed = parser.parse(input);
		console.log(JSON.stringify(parsed, null, 4));
	} catch (err) {
		console.log(err)
	}
}