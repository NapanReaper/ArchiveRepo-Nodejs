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
const waitForcommitNewBranch = () => new Promise(r => commitNewBranch())
commitNewBranch = (templateName) => {
    let createNewBranchCommand = 'git checkout -b '
    let addCommand = ' git add .'
    let commitCommand = `git commit -m "${templateName}"`
    exec(createNewBranchCommand + templateName, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
        exec(addCommand, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }
            exec(commitCommand);
        });

    })
}
createStudentBranch = (students) => {
    for (let i = 0; i < students.length; i++) {
        exec('git branch ' + students[i].RollNumber);
    }
}

const example = async (arr, labPath) => {
    for (const element of arr) {
        let labDirPath = path.join(labPath, element.Name);
        shellJs.cd(labDirPath)
        utils.createDirIfNotExists(repo)
        let repoPath = path.join(labDirPath, repo)
        shellJs.cd(repoPath);
        await waitForCreateGit();
    }
    console.log('after forEach');
}

const waitForCreateGit = () => {
    return new Promise((resolve, reject) => {
        resolve(createGitDirectory());
    });
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
const startCreateBranch = async (arr, labPath) => {
    await asyncForEach(arr, async (element) => {
        let labDirPath = path.join(labPath, element.Name);
        shellJs.cd(labDirPath)
        utils.createDirIfNotExists(repo)
        let repoPath = path.join(labDirPath, repo)
        shellJs.cd(repoPath.toString());
        let templateName = 'Template1'
        let templatePath = path.join(labPath, 'Template', `${templateName}.zip`)
        fs.createReadStream(templatePath)
            .pipe(unzipper.Extract({ path: repoPath }))
            .on('close',
                await waitForcommitNewBranch(templateName));
    });
    console.log('Done');
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
mainFunction();
// secondFunction();