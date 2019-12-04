import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import clear from 'rollup-plugin-clear';

const output = 'dist/';

export default {
    input: 'src/js/vamoose.js',
    external: ['window', 'document'],
    output: [{
        name: 'vamoose',
        file: `${output}/vamoose.esm.js`,
        format: 'esm',
        interop: false,
    },
    {
        file: `${output}/vamoose.js`,
        format: 'iife',
        name: 'vamoose',
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
    },
    {
        file: `${output}/vamoose.min.js`,
        format: 'iife',
        name: 'vamoose',
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
        plugins: [
            terser(),
        ],
    }],
    plugins: [
        clear({
            targets: [output],
        }),
        scss({
            output: `${output}/vamoose.css`,
        }),
    ],
};
