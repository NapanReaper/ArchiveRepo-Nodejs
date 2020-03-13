const child = require("child_process")
const fs = require('fs')
const shellJs = require('shelljs');
const path = require('path')
const paths = {
    DATA_FOLDER: './Data'
}
let gitPath = 'git'
const cloneArgs = [
    "clone",
    "https://github.com/NapanReaper/TestGitArchive.git",
    "--progress"
];
// child.spawnSync("git", cloneArgs);
archiveRepo = () => {
    var dirPath = "tempDir"
    try {
        //check if dirPath is exists.
        fs.statSync(dirPath);
    } catch (e) {
        fs.mkdirSync(dirPath);
    }
    child.spawnSync('"C:/Program Files/Git/bin/git.exe" archive --format zip --output ../tempDir/latest.zip 18b7cf6', { cwd: './TestGitArchive' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}


//Git create
function createGitDirectory(labName) {
    // // const labPath = path.join(__dirname, paths.DATA_FOLDER, labName);
    var dirPath = "tempDir"
    try {
        //check if dirPath is exists.
        fs.statSync(dirPath);
    } catch (e) {
        fs.mkdirSync(dirPath);
    }
    // shellJs.cd('./tempDir');
    let args = {
        init: 'init'
    }
    let opts = {
        cwd: './tempDir'
    }
    child.spawn(gitPath, args, opts);
    // child.spawn('"C:/Program Files/Git/bin/git.exe" init', (err, stdout, stderr) => {
    //     if (err) {
    //         console.log("error");
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     console.log(`stderr: ${stderr}`);
    //     //     child.spawnSync('echo . > readme.txt', (err, stdout, stderr) => {
    //     //         if (err) {
    //     //             console.log("error");
    //     //         }
    //     //         console.log(`stdout: ${stdout}`);
    //     //         console.log(`stderr: ${stderr}`);
    //     //         child.spawnSync('"C:/Program Files/Git/bin/git.exe" add .', (err, stdout, stderr) => {
    //     //             if (err) {
    //     //                 console.log("error");
    //     //             }
    //     //             console.log(`stdout: ${stdout}`);
    //     //             console.log(`stderr: ${stderr}`);
    //     //             child.spawnSync('"C:/Program Files/Git/bin/git.exe" commit -m "first commit"', (err, stdout, stderr) => {
    //     //                 if (err) {
    //     //                     console.log("error");
    //     //                 }
    //     //                 console.log(`stdout: ${stdout}`);
    //     //                 console.log(`stderr: ${stderr}`);
    //     //                 // for (let i = 0; i < students.length; i++) {
    //     //                 //     console.log(students[i]);
    //     //                 //     child.spawnSync('git checkout -b ' + students[i].RollNumber, (err, stdout, stderr) => {
    //     //                 //         if (err) {
    //     //                 //             console.log("error");
    //     //                 //         }
    //     //                 //         console.log(`stdout: ${stdout}`);
    //     //                 //         console.log(`stderr: ${stderr}`)
    //     //                 //     })
    //     //                 // }
    //     //                 child.spawnSync('git branch -a', (err, stdout, stderr) => {
    //     //                     if (err) {
    //     //                         console.log("error");
    //     //                     }
    //     //                     console.log(`stdout: ${stdout}`);
    //     //                 })
    //     //             })
    //     //         });
    //     //     });
    //     // });
    // });
}
createGitDirectory('Lab321')
