import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import clear from 'rollup-plugin-clear';

const output = 'dist/';

export default {
    input: 'src/js/vamoose.js',
    external: ['window', 'document'],
    output: [{
        file: `${output}/vamoose.js`,
        format: 'cjs',
        interop: false,
    },
    {
        file: `${output}/vamoose.min.js`,
        format: 'iife',
        name: 'version',
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
    }],
    plugins: [
        clear({
            targets: [output],
        }),
        terser(),
        scss({
            output: `${output}/vamoose.css`,
        }),
    ],
};
