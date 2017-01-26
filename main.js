const electron = require('electron');
const request = require('request');
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');
const fs = require('fs');
const ipcMain = electron.ipcMain;
const isOnline = require('is-online');

const encryptor = require('file-encryptor');
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1300, height: 800});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
  


  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function downloadVideo(url, targetPath) {
  const req = request({
    method: 'GET',
    url
  });

  const out = fs.createWriteStream(targetPath);
  req.pipe(out);
  req.on('end', () => {
    console.log("Video done downloading!");
  });
}

  ipcMain.on('download-video', (event, arg) => {
    const fileName = arg.substring(arg.lastIndexOf('/') + 1);
    if (!fs.existsSync(app.getAppPath() + '/videos/')) {
      fs.mkdirSync(app.getAppPath() + '/videos/');
    }
    downloadVideo(arg, app.getAppPath() + '/videos/' + fileName);
    });
 
  ipcMain.on('get-video', (event, arg) => {
    // console.log('this is app path:' , app.getAppPath());
    if (!fs.existsSync(app.getAppPath() + '/videos/')) {
      fs.mkdirSync(app.getAppPath() + '/videos/');
    }
    const filePath = app.getAppPath() + '/videos/' + arg;
    if (fs.existsSync(filePath)) {
      event.sender.send('play-video', filePath);
    } else {
      isOnline().then((online) => {
        if (online) {
          console.log('thisdasd', app.getAppPath())
          encryptor.encryptFile(app.getAppPath() + '/videos/gre_intro.mp4', 'encrypted.dat', key, function(err) {
            console.log('bye')
          });
           encryptor.decryptFile(app.getAppPath() + '/encrypted.dat', app.getAppPath() + '/gre_intro.mp4', key, function(err) {console.log('hello') });
          const videoUrl = 'https://gre-on-demand.veritasprep.com/' + arg;
          event.sender.send('play-video', videoUrl);
        } else {
          event.sender.send('offline-vid-error');
        }
      })
    }
  });



var key = 'My Super Secret Key';

// // Encrypt file.
// encryptor.encryptFile('/Users/NickHoltan/Desktop/gre_intro.mp4', 'encrypted.dat', key, function(err) {
//   // Encryption complete.
// });



// Decrypt file.
// encryptor.decryptFile('encrypted.dat', 'output_file.txt', key, function(err) {
//   // Decryption complete.
// });

  





