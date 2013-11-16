module.exports = function(db, date, callback) {

  var count = 0;
  var error;

  db.createReadStream({ start : date }).on('data', function(data) {
    count++;
  })
  .on('error', function(err) {
    error = err;
  })
  .on('end', function() {
    return callback.apply(null, [error, count]);
  });

};