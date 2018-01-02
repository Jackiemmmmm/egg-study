'use strict';

const { Service } = require('egg');
const qs = require('querystring');
const { symbol, contract_type } = require('../../config.json');

const queryString = (params = {}) => {
  const defaultValue = Object.assign({}, params, { symbol, contract_type });
  return `?${qs.stringify(defaultValue)}`;
};

class getPubApi extends Service {
  async api(url) {
    try {
      const { ctx } = this;
      const result = await ctx.curl(url, { dataType: 'json' });
      return result;
    } catch (err) {
      throw err;
    }
  }
  okContractApi(url, object = {}) {
    const { config } = this;
    let defaultUrl = `${url}.do${queryString(object)}`;
    if (url === 'exchange_rate') {
      defaultUrl = `${url}.do`;
    }
    return this.api(`${config.okContractApi}${defaultUrl}`);
  }
  okTicker() {
    const { config } = this;
    return this.api(`${config.okTicker}markets/tickers`);
  }
  gateioApi(url, symbol = '') {
    const { config } = this;
    return this.api(`${config.gateioApi}${url}/${symbol}`);
  }
}

module.exports = getPubApi;
