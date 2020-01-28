const sleep = (time) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, time);
});

export default {
  state: {
    count: 0,
  },
  actions: {
    increase() {
      this.setState({ count: this.getState().count + 1 });
    },
    decrease() {
      this.setState({ count: this.getState().count - 1 });
    },
    async asyncIncrease() {
      await sleep(1000);
      this.getActions().increase();
    },
  },
};
