import { withStore } from 'mp-store'
import store from './models/index';

App(withStore(store)({
  // App 内不要定义 `_mpStore` 变量，否则会被覆盖
  onLaunch() {},
}));
