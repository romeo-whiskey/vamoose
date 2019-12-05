import scss from 'rollup-plugin-scss';
import json from '@rollup/plugin-json';

const output = 'demo/';

export default [{
    input: 'src/js/vamoose.js',
    external: ['window', 'document'],
    watch: {
        include: 'src/**',
    },
    output: [{
        file: `${output}/vamoose.js`,
        format: 'iife',
        name: 'vamoose',
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
    }],
    plugins: [
        scss({
            output: true,
        }),
        json(),
    ],
}, {
    input: 'src/js/demo.js',
    output: [{
        file: `${output}/demo.js`,
        format: 'cjs',
        name: 'demo',
        interop: false,
    }],
    plugins: [
        scss({
            output: true,
        }),
        json(),
    ],
}];
