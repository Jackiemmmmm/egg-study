'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1514428248558_6030';

  // add your config here
  config.middleware = [];

  config.okContractApi = 'https://www.okex.com/api/v1/';
  config.okTicker = 'https://www.okex.com/v2/';
  config.gateioApi = 'http://data.gate.io/api2/1/';
  config.cors = {
    origin: 'http://dev.btcc.com:3001',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  return config;
};
