const electron = require('electron');
const request = require('request');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const fs = require('fs');
const ipcMain = electron.ipcMain;
const {session} = require('electron');
const isOnline = require('is-online');
const encryptor = require('file-encryptor');
const timestamp = require('unix-timestamp');
const getVideoData = require('./utils/getVideoData.js');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 1280, height: 800, minWidth: 1024, minHeight: 768 });

    fs.readdir(__dirname + '/videos', function (err, files) {
    const vidNameArr = [];
    if (err) return;
    files.forEach(function (file) {
      vidNameArr.push(file);
    });
    checkVideoTimeStamp(vidNameArr);
  });
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
  
  const ses = session.fromPartition('persist:name').cookies;


  ipcMain.on('save-user', (event, arg) => {
    // console.log(arg)
    const cookie = {url: 'http://www.auth.com', name: arg.user, value:arg.email, progress: arg.progress, expirationDate: timestamp.now('+1w')}


    ses.set(cookie, (error) => {
      if (error) console.error(error)
    });
    const improvedProg = {};
    const progressArg = arg.progress;
       

    for (let i = 0; i < progressArg.length; i += 1) {
      let vidId = progressArg[i].video_id;
      console.log(vidId)
      improvedProg[vidId] = parseInt(progressArg[i].length);
    }
    improvedProg["sid"] = Number(arg.sid);
  
        
    fs.writeFile("./progress.json", JSON.stringify(improvedProg), function (err) {
      if (err) {
        return console.log('There was an error in writing to progress.json file:', err);
      }
      console.log("The file was saved!");
    })
  })


   ipcMain.on('logout', function (event, arg){
     ses.remove('http://www.auth.com', arg.name ,function(data) {
        // console.log(data)
      })
    })
    
    ipcMain.on('check-cookie', function (event) {
      // console.log("checking cookie")
      ses.get({}, function (error, cookies) {
        let progressData;
        // console.dir(cookies);
        if (cookies) {
          fs.readFile('./progress.json', {encoding: 'utf-8'}, function (err,data) {
            if (!err){
              progressData = JSON.parse(data);
              const argData = [cookies, progressData]
              event.sender.send('cookie-exists',argData)
            } else {
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

function downloadVideo(event, url, targetPath, lesson, video) {
  const req = request({ method: 'GET', url });

  let received_bytes = 0;
  let total_bytes = 0;
  let percentage = 0;
  let temp;

  let size;
  let check;
  let out;

  if (fs.existsSync(targetPath)) {
    size = fs.statSync(targetPath).size;
    req.on('response', (data) => {
      check = parseInt(data.headers['content-length']);
      if (check === size) {
        console.log('CHECK PASSED!');
        return;
      } else {
        console.log('INCOMPLETE DOWNLOAD, DELETING FILE, PLEASE CLICK AGAIN!');
        fs.unlinkSync(targetPath);
      }
    });
  } else {
    console.log('NEW DOWNLOAD!');
    event.sender.send('download-progress', 'downloading', lesson, video);
    out = fs.createWriteStream(targetPath);

    req.on('response', function (data) {
      total_bytes = parseInt(data.headers['content-length']);
    });

    req.on('data', function(chunk) {
      received_bytes += chunk.length;
      temp = received_bytes / total_bytes * 100;
      if (temp - percentage > .75 || received_bytes === total_bytes) {
        percentage = temp;
      } 
    });

    req.pipe(out);
    req.on('end', () => {
      console.log('Completed downloading', url.slice(38));
      event.sender.send('download-progress', 'done', lesson, video);
    });
  }
}


ipcMain.on('download-video', (event, path, lesson, video) => {
 isOnline().then(function(online) {
   if (online === true) {
     console.log(path);
	   const fileName = path.substring(path.lastIndexOf('/') + 1);
     if (!fs.existsSync(app.getAppPath() + '/videos/')) {
       fs.mkdirSync(app.getAppPath() + '/videos/');
      }
      downloadVideo(event, path, app.getAppPath() + '/videos/' + fileName, lesson, video);
    } else {
      let lastTimeCalled = 0;
      if (lastTimeCalled < (Date.now() + 10000)) {
        console.log('Inside if statement');
        event.sender.send('offline-download-error');
        lastTimeCalled = Date.now();
      }

      // let throttledSend = throttle(sendOfflineDownloadErr, 3000);
      // throttledSend()
      //event.sender.send('offline-download-error');
    }
  })
});

  // function throttle (callback, limit) {
  //   let wait = false;                 
  //     return function () {             
  //       if (!wait) {                  
  //         callback();          
  //         wait = true;             
  //         setTimeout(function () {
  //           wait = false;         
  //         }, limit);
  //       }
  //     }
  //   }


function sendOfflineDownloadErr() {
   event.sender.send('offline-download-error');
}

ipcMain.on('get-video', (event, path) => {
	if (!fs.existsSync(app.getAppPath() + '/videos/')) {
		fs.mkdirSync(app.getAppPath() + '/videos/');
	}
	const filePath = app.getAppPath() + '/videos/' + path;
	if (fs.existsSync(filePath)) {
		event.sender.send('play-video', filePath);
	} else {
		isOnline().then((online) => {
			if (online) {
					// encryptor.decryptFile(app.getAppPath() + '/encrypted.dat', app.getAppPath() + '/gre_intro.mp4', key, function(err) {console.log('hello') });
				const videoUrl = 'https://gre-on-demand.veritasprep.com/' + path;
				event.sender.send('play-video', videoUrl);
			} else {
				 event.sender.send('offline-vid-error');
			}
		})
	}
});

ipcMain.on('get-video-data', (event) => {
	getVideoData(event, app.getAppPath());
});



function updateProgress() {
  isOnline().then(online => {
    if (online === true) {
      fs.readFile('./progress.json', {encoding: 'utf-8'}, function(err, data) {
        if (!err) {
          newProgress = JSON.parse(data);
         
          for (let key in newProgress) {
            let buildtUpStr = '';
            if (key.includes('gre')) {
              buildtUpStr += 'video=' + key + '&userID=' + newProgress.sid + '&progress=' + newProgress[key] + '&lessonType=gre';
              postProgress(buildtUpStr);
            }
          }
        } else {
          console.log("read file error", err);
        }
      });
    }
  })
}


function postProgress(buildtUpStr) {
console.log('inside postProgress post request')
request.post({
  headers: {'content-type' : 'application/x-www-form-urlencoded'},
  url:     'https://www.veritasprep.com/account/gmat/ajax/update-video-progress.php',
  body:    buildtUpStr
}, function (err, response, body) {
  if(err) { 
    console.log('There was an error in postProgress:', err);
  }
  console.log('inside postProgress response body of request', response, body);
  });
}

const oneMin = 60000
setInterval(updateProgress, oneMin);


function checkVideoTimeStamp(vidNameArr) {
  for (let i = 2; i < vidNameArr.length; i += 1) {
    let folderToAccess = app.getAppPath() + '/videos/';
    let videoInFolder = fs.statSync(folderToAccess + vidNameArr[i]);
    let createdVideoTime = videoInFolder.birthtime.getTime();
    let weekInMilliSec = 604800000;
   
    if ((createdVideoTime + weekInMilliSec) < Date.now()) {
      console.log('this is createdVideoTime + weekInSec:' , createdVideoTime + weekInMilliSec);
      console.log('Video is expired and is now being deleted...');
      fs.unlink(folderToAccess + vidNameArr[i]);
    }
  }
}

ipcMain.on('save-progress-clicked', (event, progress) => {
  fs.writeFile("./progress.json", JSON.stringify(progress), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Progress.json was updated!");
  })
});




// var key = 'My Super Secret Key';

// // Encrypt file.
// encryptor.encryptFile('/Users/NickHoltan/Desktop/gre_intro.mp4', 'encrypted.dat', key, function(err) {
//   // Encryption complete.
// });

// Decrypt file.
// encryptor.decryptFile('encrypted.dat', 'output_file.txt', key, function(err) {
//   // Decryption complete.
// });

  





