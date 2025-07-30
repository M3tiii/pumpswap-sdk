// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'node16',

  // ✅ This allows importing JSON
  loader: {
    '.json': 'json',
  },
})