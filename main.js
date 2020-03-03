const child = require("child_process")
const fs = require('fs')
const cloneArgs = [
    "clone",
    "https://github.com/DuyDTN/TestLibGit2Sharp.git",
    "--progress"
];
child.spawnSync("git", cloneArgs);
archiveRepo = () => {
    var dirPath = "tempDir"
    try {
        //check if dirPath is exists.
        fs.statSync(dirPath);
    } catch (e) {
        fs.mkdirSync(dirPath);
    }
    child.exec('"C:/Program Files/Git/bin/git.exe" archive --format zip --output ../tempDir/latest.zip master', { cwd: './TestLibGit2Sharp' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
}
archiveRepo();
