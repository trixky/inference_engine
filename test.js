/*	expr is all others things than VALUE like:
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
function	check_expression(expr, rules, facts)
{
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
function	check_needed(needed, rules, facts)
{
	let result;

	if (needed.type != 'VALUE') // [A + B =>]
		result = check_expression(needed, rules, facts);
	else if (needed.value.value == null) // [A or !A =>] and A is not known
		result = query_solution(needed.value, rules, facts);
	else if (needed.type == 'VALUE') // [A =>] and A is known
		result = needed.value.value;
	return (result);
}

/*
	[=> A + B] // if given contain query
*/
function	given_contain_query(given, query, rules, facts)
{
	let result = {
		value: false, 
		not: 0
	};

	if (given.type == '!')
	{
		result = given_contain_query(given.value, query, rules, facts);
		result.not++;
	}
	else if (given.type != 'VALUE')
	{
		result = given_contain_query(given.left, query, rules, facts);
		result2 = given_contain_query(given.right, query, rules, facts);
		if (result.value && result2.value && result.not % 2 != result2.not % 2)
			console.log("\x1b[31mError like [=> A + !A]"); //TODO: Gérer l'erreur
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
function	query_solution(query, rules, facts)
{	
	let result;
	let contain;
	
	for (let i = 0; i < rules.length; i++)
	{
		contain = given_contain_query(rules[i].given, query, rules, facts);
		if (contain.value)
		{
			result = check_needed(rules[i].needed, rules, facts);
			if (!result) // [A + B =>] False
				result = null;
			else if (contain.not % 2)
				result = !result;
		}
	}
	if (query.value != null) // TODO: Check fact ?
		result = query.value;
	else if (result == null)
		result = false;
	return (result);
}

/* TEST PURPOSES */

function	test_main()
{
	var facts = {
		A:	{
			name: 'A',
			value: true
		},
		B:	{
			name: 'B',
			value: null
		},
		C:	{
			name: 'C',
			value: null
		},
		D:	{
			name: 'D',
			value: true
		},
		E:	{
			name: 'E',
			value: null
		}
	};
	var rules = [
		{	// B => D
			needed: {
				type: 'VALUE',
				value: facts.B
			},
			given: {
				type: 'VALUE',
				value: facts.D
			}
		},
		{	// !D => B + !B
			needed: {
				type: '!',
				value: {
					type: 'VALUE',
					value: facts.D
				}
			},
			given: {
				type: '+',
				left: {
					type: 'VALUE',
					value: facts.B
				},
				right: {
					type: '!',
					value: {
						type: 'VALUE',
						value: facts.B
					}
				}
			}
		}
	];
	console.log("========= FACTS ===========");
	console.log(facts);
	console.log("========= RULES ===========");
	console.log(rules);
	console.log("========= QUERY ===========");
	let result = query_solution(facts.D, rules, facts);
	console.log(result);
}

test_main();
