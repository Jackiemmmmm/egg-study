'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.exchangeApi.index);
  router.get('/gateio', controller.exchangeApi.gateio);
};
