var webpack = require('webpack');
var AngularPlugin = require('angular-webpack-plugin');
var path = require('path');

var node_dir = __dirname + '/node_modules';

module.exports = {
  entry: ['./app.js'],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    root: [
	path.resolve('.'),
	path.resolve('module/dist'),
	path.resolve('node_modules'),
	path.resolve('bower_components')
    ],
    alias: {
	'bootstrap-webpack': node_dir + '/bootstrap-webpack',
	'famous': node_dir + '/famous',
	'famous-angular': node_dir + '/famous-angular/dist/famous-angular.js',
	'famous.angular': 'famous-angular',
	'famous-flex': node_dir + '/famous-flex/src'
    }
  },
  module: {
    loaders: [
      { test: /\.css$/,             loader: 'style-loader!css-loader' },
      { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },

      // Needed for the css-loader when [bootstrap-webpack](https://github.com/bline/bootstrap-webpack)
      // loads bootstrap's css.
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
    ]
  },
  plugins: [
    new AngularPlugin(),
    new webpack.ProvidePlugin({ famous: 'famous', $: "jquery", jQuery: "jquery" })
  ]
};
