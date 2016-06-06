import WebpackStrip from 'strip-loader';
import devConfig from './webpack.config.js';

delete devConfig.plugins;
delete devConfig.devtool;
delete devConfig.entry;
devConfig.devtool = 'source-map';
devConfig.module.loaders.push({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
});

export default devConfig;
