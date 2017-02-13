class DLQueue {
  constructor() {
    this.downloads = new Array();
    this.length = 0;
  }

  enqueue(str) {
    this.downloads.push(str);
    this.length += 1;
  }

  dequeue() {
    this.downloads.shift();
    this.length -= 1;
  }
}

module.exports = DLQueue;