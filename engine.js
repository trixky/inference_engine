const parser = require('./src/parser');
const path = __dirname + '/' + process.argv[2];
parser(process.cwd() + '/' + process.argv[2]);