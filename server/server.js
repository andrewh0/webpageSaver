var PORT = process.env.PORT || 8080;

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var Webpage = require('../db/webpageModel');
var db = require('../db/webpageController');
var md5 = require('md5');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

mongoose.connect('mongodb://localhost/webpageSaver');

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('/job/:jobId', function(req, res) {
  db.getWebpage(req.params.jobId, function(err, webpage) {
    if (webpage) {
      if (webpage.status !== 'queued') {
        res.json(webpage.html);
      } else {
        res.json('This job is still being processed.');
      }
    } else {
      res.json('That\'s an invalid Job ID. Please try again.');
    }
  });
});

app.post('/url', function(req, res) {
  var url = req.body.url;

  // Create a job id with first 5 characters in md5 hash
  var jobId = md5(url).split('').slice(0, 6).join('');

  db.getWebpage(jobId, function(err, webpage) {
    if (err) {
      // Error loading the webpage
      throw new Error(err);
    }
    if (!webpage) {
      // No webpage found with that jobId
      var newWebpage = {
        jobId: jobId,
        url: url,
        html: 'No HTML for this webpage yet.',
        status: 'queued'
      };
      db.initializeWebpage(newWebpage, function(err, webpage) {
        if (err) {
          // Error creating the webpage in the db
          throw new Error(err);
        }

        // TODO: Add the url to the queue
        res.json(webpage.jobId);
      });
    } else {
      // Webpage already found in the database
      res.json(webpage.jobId);
    }
  });
});

app.listen(PORT);
console.log('Server listening on port: ' + PORT);
