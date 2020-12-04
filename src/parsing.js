const fs = require('fs');
const peg = require('pegjs');
// const grammar = require('./grammar.peg.js');

const grammar = fs.readFileSync('./src/grammar.peg', 'utf-8');
// const grammar = fs.readFileSync('./src/grammar.peg.old', 'utf-8');
const input = fs.readFileSync('./src/input.txt', 'utf-8');

console.log('[' + input + ']\n\n=============================\n\n')

const parser = peg.generate(grammar);
const parsed = parser.parse(input);
console.log(parsed)

// 