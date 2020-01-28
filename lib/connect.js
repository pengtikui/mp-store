const nilFunc = () => ({});

const connect = (mapState, mapActions = nilFunc) => (pageOptions) => {
  const app = getApp();
  const { onLoad, onUnload, ...rest } = pageOptions;

  return {
    onLoad(query) {
      const setData = () => this.setData({ ...mapState(app._mpStore.getState()) });
      setData();
      this._unsubscribe = app._mpStore.subscribe(() => setData());
      onLoad && onLoad.call(this, query);
    },
    onUnload() {
      this._unsubscribe();
      onUnload && onUnload.call(this);
    },
    ...rest,
    ...mapActions(app._mpStore.getActions()),
  }
};

export default connect;
