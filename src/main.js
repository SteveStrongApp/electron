const electron = require('electron')
const shared = require('./shared.js')

// Module to control application life.
// Module to create native browser window.
const { app, BrowserWindow, ipcMain } = electron;
const { methods } = shared;

//automate reloading of app to help development
require("electron-reload")(__dirname);

const path = require('path')
const url = require('url')

let cmds = {};

if ( process.platform == 'darwin'){
  cmds = require('./macCmd')
}
if ( process.platform == 'win32'){
  cmds = require('./winCmd')
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400, 
    height: 600,
    resizeable: false
  });


  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()



  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
});

console.log(methods ); 

let actions = {
  password: methods.google,
  info: methods.bing,
  status: methods.thePolice,
  showdrive: cmds.hello,
  mapdrive: methods.execute,
  support: methods.shell,
  feedback: methods.github,
  exit: function() { app.exit(); },
}


ipcMain.on("do action", (event, arg) => {
  console.log(" action found " + arg );
  actions[arg]();
});



