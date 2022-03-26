import path from 'path'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: path.resolve(process.cwd(), './dist/esm/test-worker/test-worker.js'),
    output: {
      file: path.resolve(process.cwd(), './dist/test-worker/test-worker.mjs'),
      format: 'es',
    },
    plugins: [
      // commonjs(),
      resolve({
        browser: true,
        mainFields: ['module', 'browser', 'jsnext:main'],
      }),
    ],
  },
  {
    input: path.resolve(process.cwd(), './dist/esm/test-worker-client/test-suite.js'),
    output: {
      file: path.resolve(process.cwd(), './src/public/js/test-suite.js'),
      name: 'testSuite',
      format: 'iife',
    },
    plugins: [
      commonjs(),
      resolve({
        browser: true,
        mainFields: ['module', 'browser', 'jsnext:main'],
      }),
    ],
  },
]
