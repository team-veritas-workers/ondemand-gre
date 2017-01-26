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
const {session} = require('electron');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;




function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
 

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })

  ipcMain.on('download-video', (event, arg) => {
    console.log('hello');
    console.log(arg);
    const fileName = arg.substring(arg.lastIndexOf('/') + 1);
    downloadVideo(arg, '/Users/canoc/Library/Caches/veritas/' + fileName);
  });

  const ses = session.fromPartition('persist:name').cookies;


 ipcMain.on('save-user', (event, arg) => {

      console.log(arg)

      const cookie = {url: 'http://www.auth.com', name: arg.user, value:arg.email, expirationDate: 1531036000}

      ses.set(cookie, (error) => {
        if (error) console.error(error)
      });



  })

   ipcMain.on('logout', function(event, arg){

      ses.remove('http://www.auth.com', arg.name ,function(data){console.log(data)})

   })

  ipcMain.on('check-cookie', function(event){

  console.log("checking cookie")
    ses.get({}, function(error, cookies) {
        console.dir(cookies);
        if(cookies){
          event.sender.send('cookie-exists',cookies)
        }
        if (error) {
            console.dir(error);
        }
    })

  } )
    
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



