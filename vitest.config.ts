import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
    globals: true,        // describe, it, expect available without imports
    environment: 'node', // not jsdom — we test the API layer
    setupFiles: ['./tests/setup.js'],
  },
})