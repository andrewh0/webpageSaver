var Webpage = require('./webpageModel');

exports.getWebpage = function(jobId, callback) {
  Webpage.findOne({
    jobId: jobId
  }, function(err, webpage) {
    if (err) {
      return callback(err);
    }
    callback(null, webpage);
  });
};

exports.initializeWebpage = function(webpage, callback) {
  Webpage.create(webpage, function(err, webpage) {
    if (err) {
      return callback(err);
    }
    callback(null, webpage);
  });
};

exports.updateWebpage = function(jobId, update, callback) {
  Webpage.findOneAndUpdate({jobId: jobId}, update, {}, function(err, webpage) {
    if (err) {
      return callback(err);
    }
    callback(null, webpage);
  });
};
