const fs = require('fs');
const request = require('request');
const isOnline = require('is-online');

module.exports = (event, appPath) => {
  const URL = 'https://www.veritasprep.com/api/desktop-app/get_playlist.php';
  const body = { type: 'desktop', account: 'GRE' };
  
  let output;
  let req;

  isOnline().then(online => {
    if (online) {
      console.log('Network connection detected.')
      output = fs.createWriteStream(appPath + '/data/data.json');
      req = request.post(URL, { form: body });

      req.pipe(output);
      req.on('end', () => {
        fs.readFile(appPath + '/data/data.json', 'utf8', (err, data) => {
          event.sender.send('load-video-data', data);
        });
      });
    } else {
      console.log('No network connection.');
      fs.readFile(appPath + '/data/data.json', 'utf8', (err, data) => {
        event.sender.send('load-video-data', data);
      });
    }
  });
};