import inlineImage from 'esbuild-plugin-inline-image';
import esbuildPluginTsc from 'esbuild-plugin-tsc';

export const makeBuildSettings = (options) => ({
  entryPoints: ['./src/index.tsx'],
  outdir: './build/static/js',
  sourcemap: true,
  bundle: true,
  splitting: true,
  treeShaking: true,
  format: 'esm',
  outExtension: { '.js': '.mjs' },
  loader: {
    '.js': 'jsx'
  },
  plugins: [
    inlineImage(),
    esbuildPluginTsc({
      force: true
    })
  ],
  ...options
});
