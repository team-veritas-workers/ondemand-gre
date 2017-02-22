const fs = require('fs');

module.exports = (event, arg, sid, appPath) => {
  const improvedProg = arg;
  improvedProg["sid"] = Number(sid);
  fs.writeFile(appPath + "/progress.json", JSON.stringify(improvedProg), function (err) {
    if (err) {
      return console.log('saveProgressAuto', err);
    }
  });
}