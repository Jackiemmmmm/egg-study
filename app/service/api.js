'use strict';

const { Service } = require('egg');
const qs = require('querystring');
const { symbol, contract_type } = require('../../config.json');

const queryString = (params = {}) => {
  const defaultValue = Object.assign({}, params, { symbol, contract_type });
  return `?${qs.stringify(defaultValue)}`;
};

class getPubApi extends Service {
  async getApi(url, object = {}) {
    try {
      console.log(15, url);
      const { ctx, config } = this;
      let defaultUrl = `${url}.do${queryString(object)}`;
      if (url === 'exchange_rate') {
        defaultUrl = `${url}.do`;
      }
      const result = await ctx.curl(`${config.exchangeApi}${defaultUrl}`, {
        dataType: 'json',
      });
      if (!result.error_code) {
        return result;
      }
      return result.error_code;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = getPubApi;
