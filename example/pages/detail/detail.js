import { connect } from '@mp-components/mp-store';

const mapState = state => {
  return {
    count: state.counter.count,
  };
};

Page(connect(mapState)({}));
