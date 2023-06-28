const packageInstaller = require('child_process').spawnSync;
const path = require('path');
const fs = require('fs');

const MAX_INSTALLATION_ATTEMPTS_ALLOWED = 3;
const NPM_EXECUTABLE = 'npm';

const SERVER_OPTIONS = {
    stdio: 'inherit',
    cwd: './',
    shell: true
};

const CLIENT_OPTIONS = {
    stdio: 'inherit',
    cwd: './client',
    shell: true
}

function deleteFolderRecursively(folderpath) {
    if (fs.existsSync(folderpath)){
        fs.readdirSync(folderpath).forEach((file) => {
            const curPath = `${folderpath}${path.sep}${file}`;
            if (fs.lstatSync(curPath).isDirectory()){
                deleteFolderRecursively(curPath);
            } else {
                fs.unlinkSync(curpath);
            }
        });
        fs.rmdirSync(folderpath);
    }
}

function getNpmCommand() {
    return NPM_EXECUTABLE;
}

function cleanUp(options) {
    console.log('\ncleaning up failed installation\n');
    packageInstaller(getNpmCommand(), ['cache', 'clean', '--force'], options);

    const packagelock = `${options.cwd}${path.sep}package-lock.json`;
    if (fs.existsSync(packagelock) && fs.lstatSync(packagelock).isFile()) {
        fs.unlinkSync(packagelock);
    }

    deleteFolderRecursively(`${options.cwd}${path.sep}node_modules`);
}

function installDependencies(options){
    let installAttemptCount = 1;
    console.log(`\nInstallation attempt #${installAttemptCount}`);
    do {
        try{
            const {stderr, stdout, status} = packageInstaller(getNpmCommand(), ['install'], options);
            console.log(`Installation status ${status}`);
            if (status !== 0) {
                console.log(`Error: ${stderr.toString()}`);
                console.log(`Info: ${stdout.toString()}`);
                throw new Error('Failed to install packages');
            }
            break;
        } catch (error) {
            cleanUp(options);
            installAttemptCount += 1;
        }
    } while (installAttemptCount <= MAX_INSTALLATION_ATTEMPTS_ALLOWED);
}

console.dir(`ENV : ${process.env.NODE_BUILD_ENV}`);
console.log(`\nInstallation of Backend dependencies\n`);
installDependencies(SERVER_OPTIONS);
console.log(`\nInstallation of UI dependencies\n`);
installDependencies(CLIENT_OPTIONS);