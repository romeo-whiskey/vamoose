import { terser } from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import clear from 'rollup-plugin-clear';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import cssnano from 'cssnano';

const pkg = require('../package.json');

const output = pkg.main.substring(0, pkg.main.lastIndexOf('/') + 1);

export default {
    input: 'src/js/vamoose.js',
    external: ['window', 'document'],
    output: [{
        name: 'vamoose',
        file: pkg.module,
        format: 'esm',
        interop: false,
    },
    {
        file: pkg.main,
        format: 'iife',
        name: 'vamoose',
        globals: {
            window: 'window',
            document: 'document',
        },
        interop: false,
    },
    {
        file: `${pkg.main.slice(0, pkg.main.lastIndexOf('.'))}.min${pkg.main.slice(pkg.main.lastIndexOf('.'))}`,
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
            processor: css => postcss([autoprefixer, cssnano])
                .process(css)
                .then(result => result.css),
        }),
    ],
};
