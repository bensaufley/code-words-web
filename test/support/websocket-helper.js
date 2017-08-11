export default class WebSocketStub {
  constructor(url) {
    this.url = url;

    this.openInterval = setInterval(() => {
      if (typeof this.onopen === 'function') {
        clearInterval(this.openInterval);
        this.onopen();
      }
    }, 1);
  }
}
