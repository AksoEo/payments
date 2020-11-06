import { babel } from '@rollup/plugin-babel';
import lessModules from 'rollup-plugin-less-modules';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const prod = process.env.NODE_ENV === 'production';

export default {
    input: 'index.js',
    plugins: [
        lessModules({
            output: '../client-dist/index.css',
            exclude: [],
        }),
        babel({
            babelHelpers: 'bundled',
            presets: [
                ['@babel/preset-env'],
            ],
            exclude: ['node_modules/**'],
        }),
        nodeResolve(),
        commonjs(),
        prod && terser(),
    ].filter(x => x),
    output: {
        file: '../client-dist/index.js',
        format: 'iife',
    },
};
