const fs = require('fs');
const peg = require('pegjs');

const from_expression = (expression, facts) => {
	if (expression.type === '!') {
		from_expression(expression.value, facts);
	}
	else if (expression.type === 'v') {
		if (!facts[expression.value]) {
			facts[expression.value] = { label: expression.value, value: null };
		}
		expression.value = facts[expression.value];
	}
	else {
		from_expression(expression.left, facts);
		from_expression(expression.right, facts);
	}
};

const from_rules = (rules, facts) => {
	rules.forEach(rule => {
		from_expression(rule.needed, facts);
		from_expression(rule.given, facts);
	});
};

const from_initial_facts = (initial_facts, facts) => {
	initial_facts.forEach((initial_fact, index) => {
		if (!facts[initial_fact]) {
			facts[initial_fact] = { label: initial_fact};
		}
		facts[initial_fact].value = true;
		initial_facts[index] = facts[initial_fact];
	})
};

const from_queries = (queries, facts) => {
	queries.forEach((querie, index) => {
		if (!facts[querie]) {
			facts[querie] = { label: querie, value: null };
		}
		queries[index] = facts[querie];
	})
};

const generate_facts = parsed => {
	const facts = {};

	from_rules(parsed.rules, facts);
	from_initial_facts(parsed.initial_facts, facts);
	from_queries(parsed.queries, facts);

	return facts;
};

const parser = path => {
	let grammar;
	let input;
	let parser;

	if (path && path.split('/').pop().length > 4 && path.match(/.txt$/)) {
		try {
			grammar = fs.readFileSync(__dirname + '/grammar.peg', 'utf-8');
			input = fs.readFileSync(path, 'utf-8');
			parser = peg.generate(grammar);
		} catch (_) {
			throw 'input is not readable, or not finded'
		}
		
		try {
			const parsed = parser.parse(input);
			parser.parse(input);
			const facts = generate_facts(parsed);
			return {parsed, facts};
		} catch (_) {
			throw 'input bad formatted'
		}
	} else {
		throw 'input must have .txt extension'
	}
};

module.exports = parser;