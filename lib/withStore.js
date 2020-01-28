const withStore = (store) => (appOptions) => {
  return {
    ...appOptions,
    _mpStore: store,
  };
};

export default withStore;
