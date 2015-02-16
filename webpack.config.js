var webpack = require('webpack');
var AngularPlugin = require('angular-webpack-plugin');
var path = require('path');

var node_dir = __dirname + '/node_modules';

module.exports = {
  entry: './app.js',
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
	'famous': node_dir + '/famous',
	'famous-angular': node_dir + '/famous-angular/dist/famous-angular.js',
	'famous.angular': 'famous-angular',
	'famous-flex': node_dir + '/famous-flex/src'
    }
  },
  plugins: [
    new AngularPlugin(),
    new webpack.ProvidePlugin({ famous: 'famous', $: "jquery", jQuery: "jquery" })
  ]
};
