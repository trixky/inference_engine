/*	expr is all others things than v like:
	expr: {
		type: '+',
		left: {
			[...]
		},
		right: {
			[...]
		}
	}
*/
const check_expression = (expr, rules, facts) => {
	if (expr.type == '!')
		return (!check_needed(expr.value, rules, facts));
	else
	{
		let left = check_needed(expr.left, rules, facts);
		let right = check_needed(expr.right, rules, facts);
		switch (expr.type)
		{
			case '+':
				return (left && right);
			case '|':
				return (left || right);
			case '^':
				return (left ? !right : right);
		}
	}
}

/*	needed is left part of implies or smthg in expr like:
	[A + B =>] or [A =>] or [A] or [A + B] in expr
*/
const check_needed = (needed, rules, facts) => {
	let result;

	if (needed.type != 'v') // [A + B =>]
		result = check_expression(needed, rules, facts);
	else
		result = query_solution(needed.value, rules, facts);
	return (result);
}

/*
	[=> A + B] // if given contain query
*/
const given_contain_query = (given, query, rules, facts) => {
	let result = {
		value: false, 
		not: 0
	};

	if (given.type == '!')
	{
		result = given_contain_query(given.value, query, rules, facts);
		result.not++;
	}
	else if (given.type != 'v')
	{
		result = given_contain_query(given.left, query, rules, facts);
		result2 = given_contain_query(given.right, query, rules, facts);
		if (result.value && result2.value && result.not % 2 != result2.not % 2)
			throw "Error like [=> A + !A]";
		else if (!result.value)
			result = result2;
	}
	else if (given.value === query)
		result.value = true;
	else
		result.value = false;
	return (result);
}

/*	query = 'A' // only 1 query at a time */
const query_solution = (query, rules, facts) => {
	let result;
	let contain;
	
	if (query.value != null)
		result = query.value;
	for (let i = 0; i < rules.length; i++)
	{
		contain = given_contain_query(rules[i].given, query, rules, facts);
		if (contain.value)
		{
			let result2;
			result2 = check_needed(rules[i].needed, rules, facts);
			if (!result2) // [A + B =>] False
				result2 = null;
			else if (contain.not % 2)
				result2 = !result2;
			if (result != null && result2 != null && (result && !result2 || !result && result2))
				throw "Error: "+ query.label + " can't have different values";
			else if (result == null || !result) 
				result = result2
		}
	}
	if (query.value == null && result == null)
		result = false;
	return (result);
}

module.exports = query_solution;
