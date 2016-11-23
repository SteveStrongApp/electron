
const electron = require('electron')
const childProcess = require('child_process')

// Module to control application life.
// Module to create native browser window.
const { BrowserWindow, shell } = electron;

const { exec, spawn } = childProcess;

const openCmds = {
    darwin: 'open',
    win32: 'explorer',
    linux: 'nautilus'
}

function openDir(path) {
    const cmd = openCmds[process.platform];
    if ( cmd ) {
        spawn(cmd, [path]);
    }
    else {
        shell.showItemInFolder(path);
    }
} 

function openUrl(url){
    let child = new BrowserWindow({
        width : 1000,
        modal: false, 
        show: false
    })
    child.loadURL(url);

    child.once('ready-to-show', () => {
      child.show()
    });
    
}

let methods = {
    google: function() { 
        console.log('google here')
        openUrl('https://www.google.com');
        shell.beep();
    },
    bing: function() { 
        openUrl('https://www.bing.com')
    },
    nih: function() { 
        openUrl('https://www.nih.gov')
    },
    github: function() { 
        openUrl('https://www.github.com')
    },
    shell: function() {
        shell.openExternal('http://electron.atom.io')
    },
    execute: function() {
        exec('dir *.*', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        });
    }
}

exports.methods = methods;