import esbuild from 'esbuild';
import { makeBuildSettings } from './make-build-settings.mjs';

const settings = makeBuildSettings({
  banner: {
    js: `new EventSource('/esbuild').addEventListener('change', () => location.reload());`
  }
});

const ctx = await esbuild.context(settings);

await ctx.watch();

const { host, port } = await ctx.serve({
  host: process.env.HOST ?? 'localhost',
  port: Number(process.env.PORT ?? 3000),
  certfile: process.env.CERTFILE,
  keyfile: process.env.KEYFILE,
  servedir: 'build',
  fallback: 'build/index.html'
});

console.log(`Serving app at ${host}:${port}.`);
