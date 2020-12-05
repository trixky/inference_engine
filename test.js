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
	TODO: Penser à gérer des cas tricky d'erreur genre [=> A + !A]
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
		if (!result.value)
			result = given_contain_query(given.right, query, rules, facts);
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
			if (contain.not % 2)
				result = !result;
		}
	}
	return (result);
}

/* TEST PURPOSES */

function	test_main()
{
	var facts = {
		A:	{
			name: 'A',
			value: false
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
		{	// !(A + B) => !(E + !C)
			needed: {
				type: '!',
				value: {
					type: '+',
					left: {
						type: 'VALUE',
						value: facts.A
					},
					right: {
						type: 'VALUE',
						value: facts.B
					}
				}
			},
			given: {
				type: '!',
				value: {
					type: '+',
					left: {
						type: 'VALUE',
						value: facts.E
					},
					right: {
						type: '!',
						value: {
							type: 'VALUE',
							value: facts.C
						}
					}
				}
			}
		},
		{	// D => B
			needed: {
				type: 'VALUE',
				value: facts.D
			},
			given: {
				type: 'VALUE',
				value: facts.B
			}
		}
	];
	console.log("========= FACTS ===========");
	console.log(facts);
	console.log("========= RULES ===========");
	console.log(rules);
	console.log("========= QUERY ===========");
	let result = query_solution(facts.C, rules, facts);
	console.log(result);
}

test_main();
