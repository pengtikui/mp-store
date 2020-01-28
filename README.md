# @mp-components/mp-store

[![npm](https://img.shields.io/npm/v/@mp-components/mp-store?style=flat-square)](https://www.npmjs.com/package/@mp-components/mp-store)
[![GitHub issues](https://img.shields.io/github/issues/pengtikui/mp-store?style=flat-square)](https://github.com/pengtikui/mp-store/issues)
[![License](https://img.shields.io/github/license/pengtikui/mp-store?style=flat-square)](https://github.com/pengtikui/mp-store/blob/master/LICENSE)

简洁的微信小程序全局状态管理

> 在 1.0.0 版本之前，API 不稳定

## 特点

* 类 Redux
* 拥抱 ES6+ (async/await、Promise等)
* 自动处理 loading
* 最小程度入侵小程序
* 无 polyfill

## 使用

#### 定义 model

```js
const counter = {
  state: {
    count: 0,
  },
  actions: {
    increase() {
      this.setState({ count: this.getState().count + 1 });
    },
    async asyncIncrease() {
      await asyncFunc();
      this.setState({ count: this.getState().count + 1 });
    },
  },
};
```

#### 创建 store

```js
import { createStore } from '@mp-components/mp-store';

const store = createStore({ counter });
```

#### 在 app.js 中引用

```js
import { withStore } from '@mp-components/mp-store';

App(withStore(store)({
  onLaunch() {
    // ...
  },
}));
```

#### 在页面中使用

```js
import { connect } from '@mp-components/mp-store';

// couterCount 会被注入到 this.data 中，可以直接在 wxml 中使用
const mapState = state => ({ couterCount: state.counter.count });
// increaseCount 会被挂载到 this 上，可以直接通过 this.increaseCount() 调用
const mapActions = actions => ({ increaseCount: actions.counter.increase });

Page(connect(mapState, mapActions)(
  onLoad() {
    // ...
  },
));
```

## API

### Store

* getState([modelName])

* getActions([modelName])

* subscribe(listener)

  返回 unsubscribe 方法

### withStore

withStore(store)(appOptions)

返回 appOptions

### connect

connect(mapState[, mapActions])(pageOptions)

返回 pageOptions

## 协议

MIT License (c) 2020-preset [pengtikui](https://github.com/pengtikui)
