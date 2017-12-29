'use strict';

const gateioObjectForEach = object => {
  object = Object(object);
  const m = new Map();
  Object.keys(object).forEach(key => {
    m.set(key, object[key]);
  });
  return m;
};

module.exports = {
  gateioObjectForEach,
};
