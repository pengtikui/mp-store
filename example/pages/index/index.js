import { connect } from 'mp-store';

const mapState = (state) => ({
  ...state.counter,
});
const mapActions = (actions) => ({
  ...actions.counter,
});

Page(connect(mapState, mapActions)({
  onLoad() {},
}));
