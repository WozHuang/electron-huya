const path = require('path');
const fs = require('fs');

module.exports = {
  entry: path.resolve(__dirname, '../src/main/index.js'),
  mode: "production",
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../build')
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  target: 'electron-main',
  plugins: []
};

const hasBuildDir = fs.existsSync('build');
if (!hasBuildDir) {
  fs.mkdirSync('build');
}
fs.writeFileSync('build/package.json', JSON.stringify({ main: './main.js' }));
