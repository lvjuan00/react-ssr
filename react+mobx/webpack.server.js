const path = require('path')

const config = {
  mode: 'development',
  target: 'node',
  entry: {
    entery: path.join(__dirname, 'app-server.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server-bundle.js',
    publicPath: '/public',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js | jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
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
}
module.exports = config
