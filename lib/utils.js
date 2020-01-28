const isPlainObject = (obj) => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

export {
  isPlainObject,
};
