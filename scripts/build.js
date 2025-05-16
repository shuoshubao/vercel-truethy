const esbuild = require('esbuild');
const { externalGlobalPlugin } = require('esbuild-plugin-external-global');

console.time('esbuild build');

esbuild.build({
  entryPoints: ['src/index.jsx'],
  entryNames: '[name]',
  outdir: 'dist',
  bundle: true,
  minify: true,
  plugins: [
    externalGlobalPlugin({
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
      moment: 'window.moment',
      antd: 'window.antd',
      lodash: 'window._'
    })
  ]
});

console.timeEnd('esbuild build');
