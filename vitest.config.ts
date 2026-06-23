import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    // 'node' — current tests are pure logic. Switch to 'jsdom' (and install the
    // jsdom devDependency) once React component tests are added.
    environment: 'node',
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
