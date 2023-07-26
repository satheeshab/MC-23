const packageInstaller = require('child_process').spawnSync;
const path = require('path');
const fs = require('fs');

const MAX_INSTALLATION_ATTEMPTS_ALLOWED = 3;
const NPM_EXECUTABLE = 'npm';

const SERVER_OPTIONS = {
    stdio: 'inherit',
    cwd: './',
    shell: false
};

const CLIENT_OPTIONS = {
    stdio: 'inherit',
    cwd: './client',
    shell: true
}

function deleteFolderRecursively(folderpath) {
    console.log(`\ndeleting folders from '${folderpath}'\n`);
    if (fs.existsSync(folderpath)){
        fs.readdirSync(folderpath).forEach((file) => {
            const curPath = `${folderpath}${path.sep}${file}`;
            console.log(`\ndeleting file '${curPath}'\n`);
            
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
    try{
        console.log('\ncleaning up failed installation\n');
        packageInstaller(getNpmCommand(), ['cache', 'clean', '--force'], options);

        const packagelock = `${options.cwd}${path.sep}package-lock.json`;
        if (fs.existsSync(packagelock) && fs.lstatSync(packagelock).isFile()) {
            fs.unlinkSync(packagelock);
        }

        deleteFolderRecursively(`${options.cwd}${path.sep}node_modules`);
    } catch (error) {
        console.log(`\nexception during existing pkg cleanUp\n`);
    }
}

function installDependencies(options){
    let installAttemptCount = 1;
    console.log(`\nInstallation attempt #${installAttemptCount}\n`);

    do {
        try{
            const { stderr, stdout, status } = packageInstaller(getNpmCommand(), ['install'], options);
            console.log(`Installation status ${status}`);
            if (status !== 0) {
                console.log(`Error: ${stderr.toString()}`);
                console.log(`Info: ${stdout.toString()}`);
                throw new Error('Failed to install packages');
            }
            installAttemptCount += 1;
            break;
        } catch (error) {
            cleanUp(options);
            installAttemptCount += 1;
        }
    } while (installAttemptCount <= MAX_INSTALLATION_ATTEMPTS_ALLOWED);
}

console.log(`\nInstallation of Backend dependencies\n`);
installDependencies(SERVER_OPTIONS);
console.log(`\nInstallation of UI dependencies\n`);
installDependencies(CLIENT_OPTIONS);