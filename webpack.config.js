var webpack = require('webpack');
var AngularPlugin = require('angular-webpack-plugin');
var path = require('path');
var globule = require('globule');

var node_dir = __dirname + '/node_modules';
var bower_components = __dirname + '/bower_components';

String.prototype.hypthenatedToCamelCase = function() {
  return this.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

// modules/dist/hypthenated-name.js is aliased with camelcase(hypthenated-name)
var AddModuleAliases = function(aliases) {
  return globule.find(__dirname + '/modules/*/dist/*.js').reduce(function(obj,x) {obj[x.split('/').pop().split('.js').shift().hypthenatedToCamelCase()] = x; return obj;},aliases || {});
};

var aliases = {
	'bootstrap-webpack': node_dir + '/bootstrap-webpack',
        'famous': node_dir + '/famous',
        'famous.angular': 'famous-angular',
        'famous-angular': node_dir + '/famous-angular/dist/famous-angular.js',
        'famous-flex': node_dir + '/famous-flex/src',
	ngRoute$: 'angular-route',
	'ui.router': bower_components + '/angular-ui-router/release/angular-ui-router.js'
}

module.exports = {
  entry: ['./modules/app/dist/app.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    root: [
	//path.resolve('.'),
	path.resolve(bower_components)
    ],
    alias: AddModuleAliases(aliases)
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
