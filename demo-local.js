/*
 Restore demo file to point to the local src directory

 Run: node demo-local.js
 */
const fs = require('fs-extra');
const replace = require('replace-in-file');
//
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
