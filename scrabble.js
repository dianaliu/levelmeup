module.exports.init = function(db, words, callback) {
  // 3the, 2to, 5flour

  var operations = words.map(function(word) {
    return { type: 'put', key: word.length + word, value: word };
  });

  db.batch(operations, function(err) {
    if(err) {
      throw err;
    }

    return callback.apply(null);
  });
};

module.exports.query = function(db, word, callback) {
  var error;
  var words = [];
  // TODO: Not sure why word.replace('*', '', 'g') wasn't working. tried escaping the *
  var prefix = word.replace(/\*/g, '');
  var stars = word.length - prefix.length;
  db.createReadStream({ start: word.length + prefix, end: word.length + prefix + '\xff' })
    .on('data', function(data) {
      words.push(data.value);
    })
    .on('error', function(err) {
      error = err;
    })
    .on('end', function() {
      return callback.apply(null, [error, words]);
    });
};

