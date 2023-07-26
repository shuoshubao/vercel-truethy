const fs = require('fs');
const babel = require('@babel/core');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { createCache, extractStyle, StyleProvider } = require('@ant-design/cssinjs');
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
  const cache = createCache();

  const input = fs.readFileSync('./src/views/index.jsx').toString();

  const { code } = babel.transformSync(input, babelConfig);

  eval(code.replaceAll('exports.default', 'var App').replaceAll('"use strict";', ''));

  const html = renderToString(React.createElement(StyleProvider, { cache }, React.createElement(App, props)));
  const css = extractStyle(cache);
  return { html, css };
};
