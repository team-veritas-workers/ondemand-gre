const electron = require('electron');
const request = require('request');
const app = electron.app;
const appPath = app.getAppPath();
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const fs = require('fs');
const ipcMain = electron.ipcMain;
const { session } = require('electron');
const isOnline = require('is-online');
const encryptor = require('file-encryptor');
const timestamp = require('unix-timestamp');
const getVideo = require('./utils/getVideo.js');
const getVideoData = require('./utils/getVideoData.js');
const downloadVideo = require('./utils/downloadVideo.js');
const updateProgress = require('./utils/updateProgress.js');
const checkVideoTimeStamp = require('./utils/checkVideoTimeStamp.js');
const saveProgressAuto = require('./utils/saveProgressAuto.js');

setInterval(() => updateProgress(appPath), 20000);

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 768
  });

  fs.readdir(__dirname + '/videos', function (err, files) {
    const vidNameArr = [];
    if (err) return;
    files.forEach(function (file) {
      vidNameArr.push(file);
    });
    checkVideoTimeStamp(vidNameArr, appPath);
  });
  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './public/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })

  //this sets initial state to progress data from the HD
  ipcMain.on('getHD', function (event) {

    fs.readFile(appPath + '/progress.json', {
      encoding: 'utf-8'
    }, function (err, data) {
      if (err) console.log(err);
      if (data) {
        progressData = JSON.parse(data);
        event.sender.send("hdCheck", progressData)
      } else {
        event.sender.send("hdCheck")
          //send client to proceed as usual
      }
    })
  })

  const ses = session.fromPartition('persist:name').cookies;


  ipcMain.on('save-user', (event, arg, sid) => {
    updateProgress(appPath);
    let cookie = {
      url: 'http://www.auth.com',
      name: arg.user.replace(/\s/g, ''),
      value: arg.email.toLowerCase(),
      progress: arg.progress,
      expirationDate: timestamp.now('+1w')
    };

    ses.set(cookie, (error) => {
      if (error) console.error(error);
    });

    const improvedProg = {};
    const progressArg = arg.progress;

    for (let i = 0; i < progressArg.length; i += 1) {
      let vidId = progressArg[i].video_id;
      improvedProg[vidId] = parseInt(progressArg[i].length);
    }
    // improvedProg["sid"] = Number(sid);
    // console.log('this is improvedProg in save-user' , improvedProg)

    fs.writeFile(appPath + "/progress.json", JSON.stringify(improvedProg), function (err) {
      if (err) {
        return console.log('There was an error in writing to progress.json file:', err);
      }
      console.log("The file was saved!");
    })
  })

  //just to see what cookies there are for testing

  ses.get({}, function (error, cookies) {
    // console.log(cookies);
  })

  ipcMain.on('logout', function (event, arg) {
    console.log('this is arg', arg);
    ses.remove('http://www.auth.com', arg.name, function (data) {
      // console.log(data);
    })
  })

  ipcMain.on('check-cookie', function (event) {
    // console.log("checking cookie")
    ses.get({}, function (error, cookies) {
      let progressData;
      // console.dir(cookies);
      if (cookies) {
        fs.readFile(appPath + '/progress.json', {
          encoding: 'utf-8'
        }, function (err, data) {
          if (err) console.log(err);
          if (data) {
            progressData = JSON.parse(data);
            const argData = [cookies, progressData];
            event.sender.send('cookie-exists', argData);
          } else {
            progressData = {};
            const argData = [cookies, progressData];
            event.sender.send('cookie-exists', argData);
            console.log("read file error", err);
          }
        });
      }
      if (error) {
        console.dir(error);
      }
    })
  })
}

app.on('ready', createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : null);
app.on('activate', () => mainWindow === null ?  createWindow() : null);

ipcMain.on('get-video-data', (event) => getVideoData(event, appPath));
ipcMain.on('download-video', (event, url, lesson, vid) => downloadVideo(event, url, appPath, lesson, vid));
ipcMain.on('get-video', (event, path) => getVideo(event, path, appPath));
ipcMain.on('save-progress-auto', (event, arg, sid) => saveProgressAuto(event, arg, sid, appPath));