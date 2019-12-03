import scss from 'rollup-plugin-scss';
import browsersync from 'rollup-plugin-browsersync';

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
        name: 'Vamoose',
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
    }, {
        file: `${output}/demo.js`,
        format: 'cjs',
        interop: false,
    }],
    plugins: [
        scss({
            output: true,
        }),
        browsersync({ server: output }),
    ],
}, {
    input: 'src/js/demo.js',
    output: [{
        file: `${output}/demo.js`,
        format: 'cjs',
        interop: false,
    }],
    plugins: [
        scss({
            output: true,
        }),
    ],
}];
