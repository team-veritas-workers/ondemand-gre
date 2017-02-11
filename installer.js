var electronInstaller = require('electron-winstaller');
console.log("it is")

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: '/Users/vincentking/Desktop/ondemand-gre/GreApp-win32-ia32',
    outputDirectory: '///Users/vincentking/Desktop/installApps',
    authors: 'Veritas Workers',
    exe: 'GreApp.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));


