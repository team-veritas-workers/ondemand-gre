const fs = require('fs');

module.exports = (vidNameArr, appPath) => {
  for (let i = 2; i < vidNameArr.length; i += 1) {
    let folderToAccess = appPath + '/videos/';
    let videoInFolder = fs.statSync(folderToAccess + vidNameArr[i]);
    let createdVideoTime = videoInFolder.birthtime.getTime();
    let monthInMilliSec = 2629746000;

    if ((createdVideoTime + monthInMilliSec) < Date.now()) {
      fs.unlink(folderToAccess + vidNameArr[i]);
    }
  }
}