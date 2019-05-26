var zahteva = require('supertest')
var streznik = require('../src/server/server.js')



describe('Status', function() {
  it ('Prikaži OK', function(done) {
    zahteva(streznik).get('/todos').expect(200, done);
  });
});