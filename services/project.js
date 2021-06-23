const path = require('path');
const Utils = require('../utils');
const utils = new Utils();

async function getProjectById(projectId) {
    let fileCode = await utils.readFileData(path.resolve(`projects/${projectId}/index.js`));
    if (fileCode) {
        try {
            const itemReplace = fileCode
                .replace('module.exports =', 'return')
                .replace('require(`./${item.id}.js`);', "require(path.resolve('projects/" + projectId + "/' + item.id + '.js'))")
            const code = `
                    (function(){
                        var path = require('path');
                        ${itemReplace}
                    })()
                `;
            return eval(code);
        }
        catch (e) {
            return null;
        }
    }
    return null;
}

module.exports = {
    getProjectById
}