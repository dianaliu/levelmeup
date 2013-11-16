var level = require('level');
var fs = require('fs');

var db = level(process.argv[2], { valueEncoding: 'json' });
var json = require(process.argv[3]);
var ws = db.createWriteStream();

json.forEach(function(obj) {
  if(obj.user) {
    ws.end({ key: obj.user + '!' + obj.name, value: obj });
  } else {
    ws.end({ key: obj.name, value: obj });
  }
});
