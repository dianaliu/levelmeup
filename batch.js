var level = require('level');
var fs = require('fs');

var db = level(process.argv[2]);
var cmds = [];

var lines = fs.readFileSync(process.argv[3]).toString().split('\n');
lines.forEach(function(line) {
  var arr = line.split(',');
  cmds.push({
    'type': arr[0],
    'key': arr[1],
    'value': arr[2]
  });
});

db.batch(cmds);


