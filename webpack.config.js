import path from 'path';
import webpack from 'webpack';

const nodeModulesPath = path.resolve(__dirname, 'node_modules'),
    mainPath = path.resolve(__dirname, 'app', 'main.js');

export default {
    devtool: 'eval-source-map',
    entry: {
        main: [
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            mainPath
        ]
    },

    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public'),
        publicPath: '/public/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compressor: {
            warnings: false,
            screw_ie8: true
          }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],

    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        }],
        loaders: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, 'app'),
            loader: 'react-hot!babel-loader',
            exclude: [nodeModulesPath]
        }, {
            test: /\.css?$/,
            include: path.join(__dirname, 'app'),
            exclude: [nodeModulesPath],
            loader: 'style-loader!css-loader'
        }]
    },

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
