'use strict';

const { Controller } = require('egg');
// const { gateioObjectForEach } = require('../utils/objectForEach');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const o = Object.assign({}, await this.gateio(), await this.okTicker());
    ctx.body = o;
  }
  async okContractApi() {
    const { ctx } = this;
    const { data } = await ctx.service.api.okContractApi('future_ticker');
    return data;
  }
  async gateio() {
    const { ctx } = this;
    const { data } = await ctx.service.api.gateioApi('tickers');
    return { 'gate.io': data };
  }
  async okTicker() {
    const { ctx } = this;
    const { data: info } = await ctx.service.api.okTicker();
    const o = {};
    const { data } = info;
    console.log(data);
    for (let i = 0, len = data.length; i < len; i += 1) {
      o[data.symbol] = {
        high24hr: data.dayHigh,
        percentChange: data.changePercentage,
        last: data.last,
        low24hr: data.dayLow,
        highestBid: data.buy,
        lowestAsk: data.sell,
      };
    }
    return { okex: o };
  }
}

module.exports = HomeController;
