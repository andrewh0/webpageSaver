var expect = require('chai').expect;
require('es6-promise').polyfill();
require('isomorphic-fetch');

describe('API functions', function(){
  describe('API', function() {
    it('returns a valid jobId when POSTing to /url', function(done) {
      fetch('http://localhost:8080/url', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: 'http://www.google.com',
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        expect(data).to.equal('ed646a');
        done();
      });

    });

    it('returns a valid status when GETing a job/:jobId', function(done) {
      fetch('http://localhost:8080/job/ed646a')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // console.log(data);
        expect(data).to.be.a.string;
        done();
      });
    });
  });
});
