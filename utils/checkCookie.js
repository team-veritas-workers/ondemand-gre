const fs = require('fs');

module.exports = (event, ses, appPath) => {
  ses.get({}, function (error, cookies) {
    let progressData;
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
};
