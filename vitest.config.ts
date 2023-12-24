import * as path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    browser: {
      name: 'chromium',
      provider: 'playwright',
      headless: true,
    },
    fakeTimers: { toFake: undefined },
  },
  resolve: {
    alias: {
      fp: path.join(__dirname, 'src/utils/fp'),
      'react-native': path.join(__dirname, 'src/mocks/react-native.ts'),
    },
  },
})
