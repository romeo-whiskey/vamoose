import { terser } from 'rollup-plugin-terser';

const output = 'dist/';

export default {
    input: 'src/js/vamoose.js',
    external: ['window', 'document'],
    output: [{
        file: `${output}/bundle.js`,
        format: 'cjs',
    },
    {
        file: `${output}/vamoose.js`,
        format: 'iife',
        name: 'version',
        plugins: [terser()],
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
    }],
};
