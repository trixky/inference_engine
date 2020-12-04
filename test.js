/*	expr is all others things than VALUE or !VALUE like:
	expr: {
		type: 'AND',
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
	let left = check_needed(expr.left, rules, facts);
	let right = check_needed(expr.right, rules, facts);
	switch (expr.type)
	{
		case 'AND':
			return (left && right);
		case 'OR':
			return (left || right);
		case 'XOR':
			return (left ? !right : right);
	}
}

/*	needed is left part of implies or smthg in expr like:
	[A + B =>] or [A =>] or [A] or [A + B] in expr
*/
function	check_needed(needed, rules, facts)
{
	let result;

	if (needed.type != 'VALUE' && needed.type != '!VALUE') // [A + B =>]
		result = check_expression(needed, rules, facts);
	else if (needed.value.value == null) // [A or !A =>] and A is not known
		result = query_solution(needed.value, rules, facts);
	else if (needed.type == 'VALUE') // [A =>] and A is known
		result = needed.value.value;
	else // [!A =>] and A is known
		result = !needed.value.value;
	console.log(needed);
	return (result);
}

/*	query = 'A' // only 1 query at a time */
function	query_solution(query, rules, facts)
{	
	let result;
	
	for (let i = 0; i < rules.length; i++)
	{
		if (rules[i].given.type != 'VALUE' && rules[i].given.type != '!VALUE') // [=> A + B]
			check_expression(rules[i].given, rules, facts); // Je sais pas trop encore comment faire ça
		else if (rules[i].given.value === query) // [=> A]
			result = check_needed(rules[i].needed, rules, facts);
	}
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
			value: false
		}
	};
	var rules = [
		{	// A | B => C
			needed: {
				type: 'OR',
				left: {
					type: 'VALUE',
					value: facts.A
				},
				right: {
					type: 'VALUE',
					value: facts.B
				}
			},
			given: {
				type: 'VALUE',
				value: facts.C
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
	console.log(facts);
	console.log(rules);
	console.log("========= QUERY ===========");
	let result = query_solution(facts.C, rules, facts);
	console.log(result);
}

test_main();
