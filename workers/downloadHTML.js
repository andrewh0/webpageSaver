var mongoose = require('mongoose');
var Webpage = require('../db/webpageModel');
var db = require('../db/webpageController');

require('es6-promise').polyfill();
require('isomorphic-fetch');

// Given a URL, download the webpage and save it to the DB

var downloadHTML = function(queue) {
  // Take a job from the queue (dequeue)
  queue.dequeue(function(err, job) {
    if (err) {
      throw new Error(err);
    }
    if (!job) {
      console.log('Queue is empty.');
      return;
    }
    // Take the url from the job and request the webpage
    fetch(job.url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.text();
    })
    .then(function(html) {
      // Save the returned HTML to the database, and update status
      db.updateWebpage(job.jobId, { status: 'done', html: html }, function(err, webpage) {
        console.log('Webpage ' + job.url + ' saved!');
      });

    })
    .catch(function(err) {
      db.updateWebpage(job.jobId, { status: 'done', html: 'No response for that page. Please make sure it\'s a valid URL beginning with \'http://\'.' }, function(err, webpage) {
        console.log('Webpage ' + job.url + ' was invalid.');
      });
    });
  });
};

module.exports = function(queue) {
  setInterval(function() { downloadHTML(queue); }, 10000);
};
