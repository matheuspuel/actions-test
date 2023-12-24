import * as path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    include: ['**/*.integration.?(c|m)[jt]s?(x)'],
    fakeTimers: { toFake: undefined },
    testTimeout: 5000,
    retry: 1,
    pool: 'forks',
    poolOptions: { threads: { isolate: false }, forks: { isolate: false } },
  },
  resolve: {
    alias: {
      fp: path.join(__dirname, 'src/utils/fp'),
      'react-native': path.join(__dirname, 'src/mocks/react-native.ts'),
    },
  },
})
