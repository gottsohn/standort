if (!process.env.NODE_ENV) {
   require('dotenv').load();
}

const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  morgan = require('morgan'),
  config = require('./server/config'),
  webpack = require('webpack'),
  webpackMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware'),
  webpackConfig = require('./webpack.config.js'),
  routes = require('./server/routes'),
  app = express();
  
/* eslint-disable no-console */
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/dist'));
// all our routes go here
routes(app, config);

if (config.isDevelopment) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname,
      'dist/index.html')));

    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(config.port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('🌎  %s.', config.port);
});

module.exports = app;
