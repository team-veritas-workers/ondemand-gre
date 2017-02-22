const fs = require('fs');

module.exports = (event, appPath) => {
  fs.readFile(appPath + '/progress.json', { encoding: 'utf-8' }, (err, data) => {
    if (err) console.log('getHD Error:', err);
    if (data) event.sender.send('hdCheck', JSON.parse(data));
    else event.sender.send('hdCheck');
  });
}