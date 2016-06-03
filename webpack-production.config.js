import WebpackStrip from 'strip-loader';
import devConfig from './webpack.config.js';

delete devConfig.module.preLoaders;
delete devConfig.plugins;
delete devConfig.devtool;
delete devConfig.entry.main[0];
delete devConfig.entry.main[1];
devConfig.devtool = 'source-map';
devConfig.module.loaders.push({
  test: /\.js$/,
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
});

export default devConfig;
