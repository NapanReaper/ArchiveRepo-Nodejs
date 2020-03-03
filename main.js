const child = require("child_process")
const cloneArgs = [
    "clone",
    "https://github.com/DuyDTN/TestLibGit2Sharp.git",
    "--progress"
];
child.spawnSync("git", cloneArgs);
child.exec('"C:/Program Files/Git/bin/git.exe" archive --format zip --output ../latest.zip master', { cwd: './TestLibGit2Sharp' }, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }    
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
