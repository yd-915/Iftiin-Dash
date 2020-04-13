const path = require('path')
const webpack = require('webpack')

const mode = 'development'
const INSTALL_OPTIONS = JSON.stringify(require('./stage-install'))
const ipInfoToken = JSON.stringify(process.env.IPINFO || 'not-yet-set')

console.log({ ipInfoToken })

module.exports = {
  output: {
    filename: `worker.${mode}.js`,
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'source-map',
  mode,
  plugins: [
    new webpack.DefinePlugin({
      INSTALL_OPTIONS: INSTALL_OPTIONS,
      IPINFO_TOKEN: ipInfoToken,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
  },
}
