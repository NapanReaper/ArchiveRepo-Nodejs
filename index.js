const { exec, execSync } = require('child_process')
const utils = require('./ultis/utils')
const path = require('path')
const fs = require('fs-extra')
const unzipper = require('unzipper')
const paths = {
    DATA_FOLDER: './Data',
    FN_ASSIGNMENTS_JSON: 'assignemnt.json',
    TEMPLATE_FOLDER: 'Template'
}
//Git create

let repo = 'repo'

createGitDirectory = (param) => {
    let initCommand = 'git init'
    let echoCommand = 'echo . > Readme.txt'
    let addCommand = ' git add .'
    let commitCommand = 'git commit -m "firstCommit"'

    execSync(initCommand, param);
    execSync(echoCommand, param);
    execSync(addCommand, param);
    execSync(commitCommand, param);
}
adddNewBranch = (templateName, param) => {
    let createNewBranchCommand = `git checkout -b ${templateName}`
    let addCommand = ' git add .'
    execSync(createNewBranchCommand, param);
    execSync(addCommand, param);
}
commitNewBranch = (templateName, param) => {
    let commitCommand = `git commit -m "${templateName}"`
    execSync(commitCommand, param);
}
const waitForCreateGitDir = (param) => new Promise((resolve, reject) => {
    resolve(createGitDirectory(param));
});
const waitForAddNewBranch = (templateName, param) => new Promise((resolve, reject) => {
    resolve(adddNewBranch(templateName, param));
});
const waitForCommitNewBranch = (templateName, param) => new Promise((resolve, reject) => {
    resolve(commitNewBranch(templateName, param));
});
const waitForRemoveTemplate = (templatePath) => new Promise((resolve, reject) => {
    resolve(removeTemplate(templatePath));
});

removeTemplate = (templatePath) => {
    fs.removeSync(templatePath);
}
createStudentBranch = (students) => {
    for (let i = 0; i < students.length; i++) {
        exec('git branch ' + students[i].RollNumber);
    }
}
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
const startCreateGit = async (arr, labPath) => {
    await asyncForEach(arr, async (element) => {
        let labDirPath = path.join(labPath, element.Name);
        utils.createDirIfNotExists(path.join(labDirPath, repo));
        let repoPath = path.join(labDirPath, repo)
        console.log(repoPath);
        await waitForCreateGitDir({ cwd: repoPath });
    });
    console.log('Done');
}
const extractTemplate = async (templatePath, param) => {
    return new Promise((res, rej) => {
        fs.createReadStream(templatePath)
            .pipe(unzipper.Extract(param))
            .on('close', res);
    })
}
const startCreateBranch = async (arr, labPath) => {
    await asyncForEach(arr, async (element) => {
        let labDirPath = path.join(labPath, element.Name);
        utils.createDirIfNotExists(path.join(labDirPath, repo));
        let repoPath = path.join(labDirPath, repo)
        let templateArr = element.Template.split(",")
        await asyncForEach(templateArr, async (element) => {
            let templatePath = path.join(labPath, 'Template', element)
            console.log(templatePath);
            let templateName = element.replace('.zip', '');
            let repoTempPath = path.join(repoPath, templateName)
            console.log(repoTempPath);
            await extractTemplate(templatePath, { path: repoPath });
            await waitForAddNewBranch(`Template_${templateName}`, { cwd: repoPath });
            await waitForCommitNewBranch(`Template_${templateName}`, { cwd: repoPath });
            await waitForRemoveTemplate(repoTempPath);
        });
        console.log('Done');
    });
}
mainFunction = () => {
    var assignmentArr = utils.readAssignment();
    const labPath = path.join(paths.DATA_FOLDER, 'Lab321');
    startCreateGit(assignmentArr, labPath)
}
secondFunction = () => {
    var assignmentArr = utils.readAssignment();
    const labPath = path.join(paths.DATA_FOLDER, 'Lab321');
    startCreateBranch(assignmentArr, labPath)
}
thirdFunction = () => {
    var students = utils.readJSON('SE1626_LAB321');
    createStudentBranch(students);
}
fourthFunction = () => {
    var assignmentArr = utils.readAssignment();
    // console.log(assignmentArr[0].Template.split(","))
    assignmentArr.forEach(element => console.log(
        element.Template.split(",")));
}
mainFunction();
secondFunction();
// fourthFunction();