/*
 Some utilities
 */
const fs = require('fs-extra');
const replace = require('replace-in-file');
// Parse the util to run
const util = process.argv[2]??null;

if (util==='--demo-local') {
    // Link the demos to the the dist & src directories
    replace.sync({
        files: 'demo/*.html',
        from: /"\.\/dist\//g,
        to: '"../dist/',
    });
    replace.sync({
        files: 'demo/*.html',
        from: /"\.\/src\//g,
        to: '"../src/',
    });
    fs.removeSync('demo/dist');
    fs.removeSync('demo/src');

} else if (util==='--demo-online') {
    // Copy and link the dist & src directories into the demo directory
    replace.sync({
        files: 'demo/*.html',
        from: /"\.\.\/dist\//g,
        to: '"./dist/',
    });
    replace.sync({
        files: 'demo/*.html',
        from: /"\.\.\/src\//g,
        to: '"./src/',
    });
    fs.copySync('dist', 'demo/dist');
    fs.copySync('src/_plugin-utils-mixin.js', 'demo/src/_plugin-utils-mixin.js');
    fs.copySync('src/fudge.js', 'demo/src/fudge.js');
    replace.sync({
        files: 'demo/src/*.js',
        from: /_plugin-utils-mixin/g,
        to: '_plugin-utils-mixin.js',
    });

} else if (util==='--clean-styles') {
    // Delete the output file _ created in the styles build
    fs.removeSync('dist/_')
}
