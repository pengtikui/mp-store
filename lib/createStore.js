import { isPlainObject } from './utils.js';

/**
 * Create global store
 * @param {Object} models
 */
const createStore = (models) => {
  if (!isPlainObject(models)) {
    throw new TypeError('`models` must be plain object');
  }

  const currentState = {};
  const currentActions = {};
  const listeners = [];

  /**
   * @public
   */
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }

  /**
   * @public
   */
  function getState(modelName) {
    if (!modelName) {
      return currentState;
    }
    return currentState[modelName] || {};
  }

  /**
   * @public
   */
  function getActions(modelName) {
    if (!modelName) {
      return currentActions;
    }
    return currentActions[modelName] || {};
  }

  /**
   * @private
   */
  function _setState(modelName, newState) {
    currentState[modelName] = { ...getState(modelName), ...newState };
    listeners.forEach(listener => listener());
  }

  /**
   * @private
   */
  function _getActions(rawActions, modelName) {
    if (!isPlainObject(rawActions)) {
      return {};
    }

    const actions = {};

    const setLoading = (actionName, isLoading) => {
      const key = `${actionName}Loading`;
      _setState(modelName, { [key]: isLoading });
    };

    const context = {
      setState: function(newState) {
        _setState(modelName, newState);
      },
      getState: function(name = modelName) {
        return getState(name);
      },
      getActions: function(name = modelName) {
        return getActions(name);
      },
    };

    Object.keys(rawActions).forEach((key) => {
      actions[key] = function(...args) {
        const result = rawActions[key].apply(context, args);
        if (!result || typeof result.then !== 'function') {
          return result;
        }
        return new Promise((resolve, reject) => {
          setLoading(key, true);
          result.then((res) => {
            setLoading(key, false);
            resolve(res);
          }).catch((err) => {
            setLoading(key, false);
            reject(err);
          });
          // 小程序对 Promise.prototype.finally() 的支持堪忧
        });
      }
    });

    return actions;
  };

  Object.keys(models).forEach((key) => {
    currentState[key] = models[key].state || {};
    currentActions[key] = _getActions(models[key].actions, key);
  });

  // return store;
  return {
    getState,
    getActions,
    subscribe,
  };
};

export default createStore;
