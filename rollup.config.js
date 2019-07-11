import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import vue from 'rollup-plugin-vue';
import { terser } from 'rollup-plugin-terser';

import getEntryPathMap from './scripts/getEntryPathMap';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: getEntryPathMap({ dir: 'src/components', prefix: 's-' }),
  output: {
    dir: 'public/lib',
    format: 'esm'
  },
  plugins: [
    vue({ normalizer: 'normalizeComponent' }),
    replace({
      'process.env.NODE_ENV': production ? JSON.stringify('production') : JSON.stringify('development')
    }),
    resolve({ browser: true }),
    commonjs(),
    postcss({
      inject: false,
      use: [['sass', { includePaths: ['node_modules'] }]]
    }),
    !production && livereload('public'),
    production && terser()
  ]
};
