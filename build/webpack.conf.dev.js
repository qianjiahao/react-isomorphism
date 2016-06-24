var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('style.css');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../', 'src/app.js'),
    vendors: ['react']
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].js'),
    extractCSS,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/, loaders: ['babel'], exclude: /node_modules/
      },{
        test: /\.scss$/, loader: extractCSS.extract(['css','sass'])
      },{
        test: /\.(png|jpg)$/, loader: 'url?limit=25000'
      },{
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },{
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },{
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },{
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      }
    ]
  }
}
