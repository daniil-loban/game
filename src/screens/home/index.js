class Home {
  // constructor() { }
  // eslint-disable-next-line class-methods-use-this
  getMyMessage(oThis) {
    const greating = oThis.$root.getSettings('greating');
    return greating[Math.floor(Math.random() * greating.length)];
  }
}

const home = new Home();

export default home;
