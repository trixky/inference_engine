const fs = require('fs');
const peg = require('pegjs');

module.exports = file => {
	console.log(__dirname)
	const grammar = fs.readFileSync('./src/grammar.peg', 'utf-8');
	const path = file;
	console.log(path)
	const input = fs.readFileSync(path, 'utf-8');
	const parser = peg.generate(grammar);
	try {
		const parsed = parser.parse(input);
		console.log(JSON.stringify(parsed, null, 4));
	} catch (err) {
		console.log(err)
	}
}