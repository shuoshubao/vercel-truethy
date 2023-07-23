const esbuild = require('esbuild');
const { externalGlobalPlugin } = require('esbuild-plugin-external-global');

(async () => {
  const ctx = await esbuild.context({
    entryPoints: ['src/index.jsx'],
    outfile: 'dist/index.js',
    bundle: true,
    plugins: [
      externalGlobalPlugin({
        react: 'window.React',
        'react-dom': 'window.ReactDOM'
      })
    ]
  });

  await ctx.watch();
  console.log('watching...');
})();
