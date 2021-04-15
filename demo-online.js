/*
 Change paths and copy files so the demos will work on a production server

 Run: node demo-online.js
 */
const fs = require('fs-extra');
const replace = require('replace-in-file');
//
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
