var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var webpageSchema = new Schema({
  jobId: String,
  url: String,
  html: String,
  status: String
});

var Webpage = mongoose.model('Webpage', webpageSchema);

module.exports = Webpage;
