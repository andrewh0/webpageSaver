var redis = require('redis');
var client = redis.createClient();

exports.enqueue = function(element, callback) {
  client.rpush('jobs', JSON.stringify(element), function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, data);
  });
};

exports.dequeue = function(callback) {
  client.lpop('jobs', function(err, data) {
    if (err) {
      return callback(err);
    }
    return callback(null, JSON.parse(data));
  });
};
