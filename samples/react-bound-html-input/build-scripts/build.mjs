import esbuild from 'esbuild';
import { makeBuildSettings } from './make-build-settings.mjs';

try {
  await esbuild.build(makeBuildSettings({ minify: true }));
} catch (e) {
  process.exit(1);
}
