const { exec, execSync, spawn } = require('child_process')
const shellJs = require('shelljs');
const utils = require('./ultis/utils')
const path = require('path')
const fs = require('fs')
const unzipper = require('unzipper')
const paths = {
    DATA_FOLDER: './Data',
    FN_ASSIGNMENTS_JSON: 'assignemnt.json',
    TEMPLATE_FOLDER: 'Template'
}
//Git create



// startAsynForEach([1, 2, 3]);
let opts = {}
let repo = 'repo'

createGitDirectory = () => {
    let gitPath = 'git'
    var initArgs = [
        'init',
    ]
    let echoCommand = 'echo . > Readme.txt'
    let addCommand = ' git add .'
    let commitCommand = 'git commit -m "firstCommit"'

    spawn(gitPath, initArgs, opts);
    execSync(echoCommand);
    execSync(addCommand);
    execSync(commitCommand);
}
const waitForCreateGitDir = () => new Promise((resolve, reject) => {
    resolve(createGitDirectory());
});
const waitForAddNewBranch = (templateName) => new Promise((resolve, reject) => {
    resolve(adddNewBranch(templateName));
});
const waitForCommitNewBranch = (templateName) => new Promise((resolve, reject) => {
    resolve(commitNewBranch(templateName));
});
adddNewBranch = (templateName) => {
    let createNewBranchCommand = `git checkout -b ${templateName}`
    let addCommand = ' git add .'
    execSync(createNewBranchCommand);
    execSync(addCommand);
}
commitNewBranch = (templateName) => {
    let commitCommand = `git commit -m "${templateName}"`
    execSync(commitCommand);
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
        shellJs.cd(labDirPath)
        utils.createDirIfNotExists(repo)
        let repoPath = path.join(labDirPath, repo)
        shellJs.cd(repoPath);
        // console.log(repoPath);
        await waitForCreateGitDir();
        // createGitDirectory();
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
        shellJs.cd(labDirPath)
        utils.createDirIfNotExists(repo)
        let repoPath = path.join(labDirPath, repo)
        shellJs.cd(repoPath.toString());
        let templateName = 'Template1'
        let templatePath = path.join(labPath, 'Template', `${templateName}.zip`)
        await extractTemplate(templatePath, { path: repoPath });
        await waitForAddNewBranch(templateName);
        await waitForCommitNewBranch(templateName);
        console.log('Done');
    });
}
mainFunction = () => {
    var assignmentArr = utils.readAssignment();
    const labPath = path.join(__dirname, paths.DATA_FOLDER, 'Lab321');
    shellJs.cd(labPath.toString());
    startCreateGit(assignmentArr, labPath)
    // example(assignmentArr, labPath)
}
secondFunction = () => {
    var assignmentArr = utils.readAssignment();
    const labPath = path.join(__dirname, paths.DATA_FOLDER, 'Lab321');
    shellJs.cd(labPath.toString());
    startCreateBranch(assignmentArr, labPath)
}
thirdFunction = () => {
    var students = utils.readJSON('SE1626_LAB321');
    createStudentBranch(students);
}
// mainFunction();
secondFunction();