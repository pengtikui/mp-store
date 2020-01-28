import { createStore } from 'mp-store';
import counter from './counter';

const store = createStore({ counter });

export default store;
