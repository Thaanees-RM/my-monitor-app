const express = require('express');
const client = require('prom-client');
const app = express();

const counter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

app.use((req, res, next) => {
  counter.inc(); // count every request
  next();
});

app.get('/', (req, res) => res.send('Hello, World!'));
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
