const fs = require('fs');
const babel = require('@babel/core');
const React = require('react');
const { renderToString } = require('react-dom/server');
require('antd');

const babelConfig = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '200'
        }
      }
    ]
  ]
};

module.exports = props => {
  const input = fs.readFileSync('./src/views/index.jsx').toString();

  const { code } = babel.transformSync(input, babelConfig);

  eval(code.replaceAll('exports.default', 'global.App'));

  return renderToString(React.createElement(App, props));
};
