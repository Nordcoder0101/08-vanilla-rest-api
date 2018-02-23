'use strict';

const http = require('http');
const Cat = require('./model/cat.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();


router.get('/api/cat', function(req, res) {
  if (req.url.query.id) {
    storage.fetchItem('cat', req.url.query.id)
      .then( cat => {
        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.write(JSON.stringify(cat));
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('response not found');
        res.end();
      });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'plain/text'
  });
  res.write('bad response');
  res.end();
});

router.post('/api/cat', function(req, res) {
  try {
    var cat = new Cat(req.body.name, req.body.content);
    storage.createItem('cat', cat);
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.write(JSON.stringify(cat));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400, {
      'Content-Type': 'text/plain'
    });
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/cat', function(req, res) {
  if (req.url.query.id) {
    storage.delete('cat', req.url.query.id)
      .then( () => {
        res.writeHead(204, {
          'Content-Type': 'text/plain'
        });
        res.write('cat is dead');
        res.end();
      })
      .catch( err => {
        console.error(err);
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.write('no cat found');
        res.end();
      });
    return;
  }
  res.writeHead(400, {
    'Content-Type': 'plain/text'
  });
  res.write('bad response');
  res.end();
});


const server = http.createServer(router.route());


server.listen(PORT, () => {
  console.log(`server be jammin on ${PORT}`);
});