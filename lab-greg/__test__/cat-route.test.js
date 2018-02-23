'use strict';

const request = require('superagent');
require('../server.js');
require('jest');

describe('Cat Routes', function() {
  var cat = null;
  describe('POST: /api/cat', function() {
    it('should return a cat', function(done) {
      request.post('localhost:3000/api/cat')
        .send({name: 'test name', content: 'test content' })
        .end((err, res) => {
          if(err) return done(err);
          cat = JSON.parse(res.text);
          expect (res.status).toEqual(200);
          expect(cat.name).toEqual('test name');
          expect(cat.content).toEqual('test content');
          done();
        });
    });
  });
  describe('GET: /api/cat', function() {
    it('should return a cat', function(done) {
      request.get(`localhost:3000/api/cat?id=${cat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          let gotCat = JSON.parse(res.text);
          expect(res.status).toEqual(200);
          expect(gotCat.name).toEqual('test name');
          expect(gotCat.content).toEqual('test content');
          done();
        });
    });
  });
  describe('DELETE: /api/cat', function() {
    it('should delete a cat', function(done) {
      request.delete(`localhost:3000/api/cat?id=${cat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(204);
          done();
        });
    });
  });
});