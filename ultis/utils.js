const fs = require('fs')
const path = require('path')
const paths = {
    DATA_FOLDER: '../Data',
    FN_ASSIGNMENTS_JSON: 'assignment.json'
}
let dataFolderPath = path.join(__dirname, paths.DATA_FOLDER);
exports.readAssignment = () => {
    let assignmentPath = path.join(dataFolderPath, 'LAB321', paths.FN_ASSIGNMENTS_JSON)
    let arr = []
    try {
        let rawData = fs.
            readFileSync(assignmentPath);
        let obj = JSON.parse(rawData)
        for (const property in obj) {
            arr.push(obj[property]);
        }
    } catch (err) {
        console.log(err);
    }
    return arr;
}
exports.readJSON = (fileName) => {
    let dataObj = "";
    let filePath = path.join(dataFolderPath, fileName)
    try {
        let rawData = fs.readFileSync(filePath);
        dataObj = JSON.parse(rawData)
    } catch (error) {
        console.log(error);

    }
    return dataObj
}
exports.createDirIfNotExists = (dirPath) => {
    try {
        //check if dirPath is exists.
        fs.statSync(dirPath);
    } catch (e) {
        fs.mkdirSync(dirPath);
    }
}