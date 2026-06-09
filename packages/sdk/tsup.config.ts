import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
  },
  {
    entry: ['src/cli.ts'],
    format: ['cjs'],
    clean: false,
    banner: {
      js: '#!/usr/bin/env node',
    },
  }
]);
