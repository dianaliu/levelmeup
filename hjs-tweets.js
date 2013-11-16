module.exports = function(db, date, callback) {

  var tweets = [];
  var error;

  db.createReadStream({ start: date, end: date + '\xff' })
    .on('data', function(tweet) {
      tweets.push(tweet.value);
    })
    .on('error', function(err) {
      error = err;
    })
    .on('end', function() {
      return callback.apply(null, [error, tweets]);
    });

};