// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron')

const { ipcRenderer} = electron;

const buttons = ["password","info","status","showdrive","mapdrive","support","feedback","exit"]

buttons.forEach( tag => {
    document.getElementById(tag).addEventListener('click', function() {
        ipcRenderer.send("do action",tag);
        console.log("clicked: " + tag );
    });
})


