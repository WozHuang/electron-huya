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
    // 保证模块路径正确
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  target: 'electron-main',
  plugins: []
};

const hasBuildDir = fs.existsSync('build');
if (!hasBuildDir) {
  fs.mkdirSync('build');
}
fs.writeFileSync('build/package.json', JSON.stringify({ main: './main.js' }));
