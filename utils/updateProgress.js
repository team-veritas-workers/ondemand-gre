const isOnline = require('is-online');
const fs = require('fs');
const request = require('request');

function postProgress(buildtUpStr) {
  request.post({
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    url: 'https://www.veritasprep.com/account/gmat/ajax/update-video-progress.php',
    body: buildtUpStr
  }, function (err, response, body) {
    if (err) {
      console.log('There was an error in postProgress:', err);
      return;
    }
  });
}

module.exports = (appPath) => {
  console.log('Updated progress!');
  isOnline().then(online => {
    if (online === true) {
      fs.readFile(appPath + '/progress.json', {
        encoding: 'utf-8'
      }, function (err, data) {
        if (!err && data) {
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
  });
}