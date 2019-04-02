const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const config = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, 'app.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name][hash]'.js,
    publicPath: '/public/', // 注意这要//  会影响hot功能
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js || jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: { // 定义
    extensions: ['.js', '.jsx'],
    alias: {
      '@views': resolve('client/views'),
      '@store': resolve('client/store'),
      '@config': resolve('client/config'),
      '@component': resolve('client/components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './favicon.ico',
      template: path.join(__dirname, 'template.html'),
    }),
  ],
}
console.log(isDev)
if (isDev) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, 'app.js'),
    ],
  }
  config.devServer = {
    host: '0.0.0.0',
    port: '5000',
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    overlay: {
      errors: true,
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html',
    },
    // proxy: 'localhost:1234',
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config
