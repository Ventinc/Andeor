const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'andeor.js',
    library: 'Andeor',
    libraryTarget: 'umd',
  }
};