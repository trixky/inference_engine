const debase = 'A'

let stat_actuel = 'AD'

///////////////////////////////////////// STRUCTURE

const structure_expression = {
    type: 'AND/OR/XOR',
    first: {},
    second: {}
}

const structure_expression = {
    type: 'VALUE',
    value: 'A'
}

const structure_condition = {
    last_stat: '',
    needed: {},
    given: {}
}

const structure_fact = {
    hash: 'ABBCDD',
    facts: {
        A: false,
        B: true,
        C: false,
        D: true
    }
}

///////////////////////////////////////// EXEMPLE

const parsed = {
    asdfasdfasdf: {
        last_stat: 'AD',
        needed: {
            type: 'AND',
            first: {
                type: 'VALUE',
                value: 'A'
            },
            second: {
                type: 'OR',
                first: {
                    type: '!VALUE',
                    value: 'B'
                },
                second: {
                    type: 'VALUE',
                    value: 'C'
                },
            }
        },
        given: {
            type: 'VALUE',
            value: structure_fact.facts['A']
        }
    },
    tata: {
        parents: [this.rules[0]],
        facts: structure_fact,
        last_stat: 'AD',
        needed: {
            type: 'AND',
            first: {
                type: 'VALUE',
                value: 'A'
            },
            second: {
                type: 'OR',
                first: {
                    type: '!VALUE',
                    value: 'B'
                },
                second: {
                    type: 'VALUE',
                    value: 'C'
                },
            }
        },
        given: {
            type: 'VALUE',
            value: 'D'
        }
    }
}