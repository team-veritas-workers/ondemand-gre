const fs = require('fs');
const updateProgress = require('./updateProgress.js');
const timestamp = require('unix-timestamp');

module.exports = (event, arg, sid, appPath, ses) => {
  const improvedProg = {};
  const progressArg = arg.progress;
  const cookie = {
    url: 'http://www.auth.com',
    name: arg.user.replace(/\s/g, ''),
    value: arg.email.toLowerCase(),
    progress: arg.progress,
    expirationDate: timestamp.now('+1w')
  };

  updateProgress(appPath);

  ses.set(cookie, (err) => err ? console.log('Error saving user data:', err) : null);

  for (let i = 0; i < progressArg.length; i += 1) {
    let vidId = progressArg[i].video_id;
    improvedProg[vidId] = parseInt(progressArg[i].length);
  }

  fs.writeFile(appPath + "/progress.json", JSON.stringify(improvedProg), function (err) {
    if (err) return console.log('Error writing to progress.json file:', err);
    console.log("The file was saved!");
  });
}