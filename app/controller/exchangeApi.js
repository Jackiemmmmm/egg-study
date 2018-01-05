'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    try {
      const o = Object.assign({},
        await this.gateio(),
        await this.okTicker()
      );
      ctx.body = o;
    } catch (err) {
      ctx.body = { error: 'Error Response' };
    }
  }
  async okContractApi() {
    const { ctx } = this;
    try {
      const { data } = await ctx.service.api.okContractApi('future_ticker');
      return data;
    } catch (err) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
      return ctx.body;
    }
  }
  async gateio() {
    const { ctx } = this;
    try {
      const { data } = await ctx.service.api.gateioApi('tickers');
      ctx.body = { 'gate.io': data };
      return ctx.body;
    } catch (err) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
      return ctx.body;
    }
  }
  async okTicker() {
    const { ctx } = this;
    try {
      const { data: info } = await ctx.service.api.okTicker();
      const o = {};
      const { data } = info;
      for (let i = 0, len = data.length; i < len; i += 1) {
        const d = data[i];
        o[d.symbol] = {
          high24hr: d.dayHigh,
          percentChange: d.changePercentage,
          last: d.last,
          low24hr: d.dayLow,
          highestBid: d.buy,
          lowestAsk: d.sell,
        };
      }
      ctx.body = { okex: o };
      return ctx.body;
    } catch (err) {
      ctx.status = err.status;
      ctx.body = { error: err.message };
      return ctx.body;
    }
  }
}

module.exports = HomeController;
