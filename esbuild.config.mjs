import esbuild from 'esbuild';

const isProd = process.env.NODE_ENV === 'production';

esbuild.build({
  entryPoints: ['main.ts'],
  bundle: true,
  external: ['obsidian'],
  format: 'cjs',
  platform: 'node',
  target: 'node14',
  outfile: 'main.js',
  minify: isProd,
  sourcemap: !isProd,
}).catch(() => process.exit(1));
