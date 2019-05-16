// 用于修改create-react-app的默认配置
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');

const f = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  // less语法
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' },
  }),
  // 装饰器语法
  addDecoratorsLegacy()
);

module.exports = function (config,) {
  // 可以在这里改webpack的config
  config.resolve.alias['@'] = path.resolve(__dirname, 'src');
  f.apply(this, arguments);
  return config;
};

