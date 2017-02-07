const fs = require('fs');
const request = require('request');``
const isOnline = require('is-online');

module.exports = (event, appPath) => {
  const URL = 'https://www.veritasprep.com/api/desktop-app/get_playlist.php';
  const body = { type: 'desktop', account: 'GRE' };
  const correctError = (data) => {  
    const correction = JSON.parse(data);
    correction[0].videos[8].name = 'gre_1_7';
    return JSON.stringify(correction);
  }
  const addDownloadStatus = (data) => {
    const videoData = JSON.parse(data);
    videoData.map(lesson => {
      return lesson.videos.map(video => {
        const filePath = `${ appPath }/videos/${ video.name }.mp4`;
        video.downloaded = fs.existsSync(filePath) ? true : false;
        // if (exists) {
        //   do get request for data headers content length!
        //   if fs.statSync().size !== content-length... DLETE!
        // }
      });
    });
    return JSON.stringify(videoData);
  }
  const sendFile = () => {
    fs.readFile(appPath + '/data/data.json', 'utf8', (err, data) => {
      data = correctError(data);
      data = addDownloadStatus(data);
      event.sender.send('load-video-data', data);
    });
  }
  
  let output;
  let req;

  isOnline().then(online => {
    if (online) {
      console.log('Network connection detected.');
      output = fs.createWriteStream(appPath + '/data/data.json');
      req = request.post(URL, { form: body });
      req.pipe(output);
      req.on('end', () => sendFile());
    } else {
      console.log('No network connection.');
      sendFile();
    }
  });
};