const fs = require('fs');
const isOnline = require('is-online');
const request = require('request');
const DLQueue = require('./DLQueue.js');
// instantiate empty download Queue
const QUEUE = new DLQueue();
const downloading = {
  status: false
};
// check file size vs content
const checkVideoFile = (downloadedSize, totalSize, filePath) => {
  if (downloadSize !== totalSize) {
    console.log('Video download interrupted. Delete video file.')
    fs.unlinkSync(filePath);
  }
}
// download logic
const download = (event, url, lessonIndex, videoIndex, filePath) => {
  console.log('--------START-------', filePath);
  console.log('QUEUE', QUEUE);
  console.log('LENGTH', QUEUE.length);
  console.log('Initialize download...', 'downloading status set to', downloading.status);
  event.sender.send('download-progress', 'downloading', lessonIndex, videoIndex);
  const req = request({ method: 'GET', url });
  const out = fs.createWriteStream(filePath);

  // let received_bytes = 0;
  // let total_bytes = 0;
  // let percentage = 0;
  // let temp;

  req.on('response', (data) => {
    // total_bytes = parseInt(data.headers['content-length']);
  });
  req.on('data', (chunk) => {
    // received_bytes = chunk.length;
    // temp = received_bytes / total_bytes * 100;
    // if (temp - percentage > .75 || received_bytes === total_bytes) {
    //   percentage = temp;
    // }
  });
  req.pipe(out);
  req.on('end', () => {
    console.log('Download complete:', url.slice(38));
    event.sender.send('download-progress', 'done', lessonIndex, videoIndex);
    if (QUEUE.length > 1) {
      QUEUE.dequeue();
      download(QUEUE.downloads[0].event,
               QUEUE.downloads[0].url,
               QUEUE.downloads[0].lessonIndex,
               QUEUE.downloads[0].videoIndex,
               QUEUE.downloads[0].filePath);
    } else {
      downloading.status = !downloading.status;
      console.log('No more downloads!', 'downloading?', downloading.status);
      QUEUE.dequeue();
      console.log('Remaining in queue (should be empty', QUEUE);
    }
  })
};
// export function 
module.exports = (event, url, filePath, lessonIndex, videoIndex) => {
  isOnline().then(online => {
    // valid network connection, download attempted
    if (online && fs.existsSync(filePath)) {
      req.on('response', data => {
        checkVideoFile(fs.statSync(filePath), parseInt(data.headers['content-length']));
      });
    }
    // valid connection, no download requests
    else if (online && !fs.existsSync(filePath)) {
      QUEUE.enqueue({
        event: event,
        url: url,
        filePath: filePath,
        lessonIndex: lessonIndex,
        videoIndex: videoIndex
      });
      console.log('ENQUEUE!', QUEUE);
      if (!downloading.status) {
        downloading.status = !downloading.status;
        download(QUEUE.downloads[0].event,
                 QUEUE.downloads[0].url,
                 QUEUE.downloads[0].lessonIndex,
                 QUEUE.downloads[0].videoIndex,
                 QUEUE.downloads[0].filePath);
      }
    }
    // offline
    else {
      event.sender.send('offline-download-error');
    }
  });
}