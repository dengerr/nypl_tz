var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var cssName = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin(cssName),
  ],
  module: {
    /*    rules: [
     {
     test: /\.js$/,
     include: [
     path.resolve(__dirname, "src"),
     ],
     // exclude: /node_modules/,
     loader: "eslint-loader",
     options: {
     // eslint options (if necessary)
     }
     },
     ],*/
    loaders: [

      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),
      },
      {
        loaders: ['babel-loader'],
        include: [
          path.resolve(__dirname, "src"),
        ],
        test: /\.js$/,
        // plugins: ['transform-runtime'],
      },
    ],
  },
}