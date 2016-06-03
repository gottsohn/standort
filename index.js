import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';
import config from './server/config';
import httpProxy from 'http-proxy';
import routes from 'server/routes';
/* eslint-disable no-console */
const proxy = httpProxy.createProxyServer(),
  app = express(),
  publicPath = path.resolve(__dirname, 'public');

// establish connection to mongoose
mongoose.connect(config.database, (err) => {
  if (err) {
    console.log(err);
  }
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(publicPath));

if (!config.isProduction) {
  var bundle = require('./bundle.js');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/public/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:3000'
    });
  });
}

proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again....', e);
});

// all our routes goes here
routes(app, express);
app.listen(config.port, (err) => {
  if (err) {
    throw err;
  }

  console.log('Server running on port:', config.port);
});

export default app;
