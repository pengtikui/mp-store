import { connect } from 'mp-store';

const mapState = state => {
  return {
    count: state.counter.count,
  };
};

Page(connect(mapState)({}));
