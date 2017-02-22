const electron = require('electron');
const app = electron.app;
const appPath = app.getAppPath();
const ipcMain = electron.ipcMain;
const { session } = require('electron');
const BrowserWindow = electron.BrowserWindow;
const request = require('request');
const path = require('path');
const url = require('url');
const fs = require('fs');
const isOnline = require('is-online');
const encryptor = require('file-encryptor');
// const timestamp = require('unix-timestamp');
const getVideo = require('./utils/getVideo.js');
const getVideoData = require('./utils/getVideoData.js');
const downloadVideo = require('./utils/downloadVideo.js');
const updateProgress = require('./utils/updateProgress.js');
const checkVideoTimeStamp = require('./utils/checkVideoTimeStamp.js');
const saveProgressAuto = require('./utils/saveProgressAuto.js');
const getHD = require('./utils/getHD.js');
const saveUser = require('./utils/saveUser.js');
const logout = require('./utils/logout.js');
const checkCookie = require('./utils/checkCookie.js');

setInterval(() => updateProgress(appPath), 20000);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1280, height: 800, minWidth: 1024, minHeight: 768 });
  const ses = session.fromPartition('persist:name').cookies;
  const vidNameArr = [];
  fs.readdir(__dirname + '/videos', function (err, files) {
    if (err) return;
    files.forEach(file => vidNameArr.push(file));
    checkVideoTimeStamp(vidNameArr, appPath);
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './public/index.html'),
    protocol: 'file:',
    slashes: true
  }));
  mainWindow.on('closed', () => mainWindow = null);
  ipcMain.on('getHD', (event) => getHD(event, appPath));
  ipcMain.on('save-user', (event, arg, sid) => saveUser(event, arg, sid, appPath, ses));
  ipcMain.on('logout', (event, arg) => logout(event, arg, ses));
  ipcMain.on('check-cookie', (event) => checkCookie(event, ses, appPath));
}

app.on('ready', createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : null);
app.on('activate', () => mainWindow === null ? createWindow() : null);

ipcMain.on('get-video-data', (event) => getVideoData(event, appPath));
ipcMain.on('download-video', (event, url, lesson, vid) => downloadVideo(event, url, appPath, lesson, vid));
ipcMain.on('get-video', (event, path) => getVideo(event, path, appPath));
ipcMain.on('save-progress-auto', (event, arg, sid) => saveProgressAuto(event, arg, sid, appPath));