const path = require('path');
const esbuild = require('esbuild');
const { externalGlobalPlugin } = require('esbuild-plugin-external-global');
const manifest = require('esbuild-plugin-manifest');

const PUBLIC_PATH = '/';

esbuild.build({
  entryPoints: ['src/index.jsx'],
  entryNames: '[name]-[hash]',
  outdir: 'dist',
  bundle: true,
  minify: true,
  plugins: [
    manifest({
      shortNames: true,
      generate(entries) {
        return Object.entries(entries).reduce(
          (prev, [k, v]) => {
            prev[path.parse(k).name] = `/${v}`;
            return prev;
          },
          { publicPath: PUBLIC_PATH }
        );
      }
    }),
    externalGlobalPlugin({
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
      moment: 'window.moment',
      antd: 'window.antd',
      lodash: 'window._'
    })
  ]
});
