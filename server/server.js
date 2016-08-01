var PORT = process.env.PORT || 8080;

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('/job/:jobId', function(req, res) {
  res.json(req.params.jobId);
});

app.post('/url', function(req, res) {
  res.json(req.body.url);
});

app.listen(PORT);
console.log('Server listening on port: ' + PORT);
