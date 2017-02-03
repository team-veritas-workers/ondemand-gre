# Veritas Prep GRE On-demand

**Clone, run and contribute!**

## To Use

To clone and run this repository you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/team-veritas-workers/ondemand-gre.git
# Go into the repository
cd ondemand-gre
# Install dependencies
npm install
# Run the app
npm start
```
ISSUES: This app uses a module with a known bug that causes video stutter when a user drags the slider to the end of the video. To fix this, change FilePlayer.js in react-player module to include this line of code:
```
key: 'seekTo',
    value: function seekTo(fraction) {
      _get(FilePlayer.prototype.__proto__ || Object.getPrototypeOf(FilePlayer.prototype), 'seekTo', this).call(this, fraction);
      // add this line
      if (fraction === 1) {
        this.player.pause();
      }
      // no more stutter!
      this.player.currentTime = this.getDuration() * fraction;
    }
```

Learn more about Veritas Prep (http://veritasprep.com/).

created by team-veritas-workers.
