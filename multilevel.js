var multilevel = require('multilevel');
var level = require('level');
var net = require('net');

var db = multilevel.client();
var connection = net.connect(4545);
connection.pipe(db.createRpcStream()).pipe(connection);

db.get('multilevelmeup', function(err, val) {
  if(!err) console.log(val);
  connection.end();
});