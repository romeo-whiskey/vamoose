import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';

const output = 'dist/';

export default {
    input: 'src/js/vamoose.js',
    external: ['window', 'document'],
    output: [{
        file: `${output}/bundle.js`,
        format: 'cjs',
    },
    {
        file: `${output}/bundle.min.js`,
        format: 'iife',
        name: 'version',
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
    }],
    plugins: [
        terser(),
        scss({
            output: `${output}/styles.css`,
        }),
    ],
};
