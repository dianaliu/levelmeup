var level = require('level');

var path = process.argv[2];

var db = level(path);
db.get('levelmeup', function(err, val) {
  if(err) throw err;
  console.log(val);
});