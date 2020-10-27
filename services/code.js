const prettier = require('prettier');
const mkdirp = require('mkdirp');
const fs = require('fs-extra');
const getDirName = require('path').dirname;

/**
 * 
 * @param {string} code 
 */
function formatJSCode(code) {
    return prettier.format(code, {semi: true, parser: 'babel', tabWidth: 4});
}

/**
 * 
 * @param {string} code 
 */
function formatJSONCode(code) {
    return prettier.format(code, {semi: true, parser: 'json', tabWidth: 4});
}

/**
 * 
 * @param {string} code 
 * @param {string} filePath 
 */
async function saveCode(filePath, code) {
    return fs.outputFile(filePath, code);
}

module.exports = {
    formatJSCode,
    formatJSONCode,
    saveCode
}