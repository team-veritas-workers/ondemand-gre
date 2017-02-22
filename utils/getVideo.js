const fs = require('fs');
const isOnline = require('is-online');

module.exports = (event, path, appPath) => {
  const filePath = appPath + '/videos/' + path;
  const videoUrl = 'https://gre-on-demand.veritasprep.com/' + path;
  if (fs.existsSync(filePath)) {
    event.sender.send('play-video', filePath);
  } else {
    isOnline().then((online) => {
      if (online) {
        event.sender.send('play-video', videoUrl);
      } else {
        event.sender.send('offline-vid-error');
      }
    });
  }
}