const fs = require('fs');

module.exports = (event, ses, appPath) => {
  ses.get({}, (error, cookies) => {
    if (error) {
      console.log('checkCookie error', error);
    }
    if (cookies) {
      fs.readFile(appPath + '/progresss.json', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
          console.log('checkCookie readFile progress', err);
        }
        if (data) {
          console.log('COOKIE!');
          event.sender.send('cookie-exists', [cookies, JSON.parse(data)]);
        } else {
          event.sender.send('cookie-exists', [cookies, {}]);
        }
      });
    }
  });
}