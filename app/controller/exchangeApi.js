'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { data } = await ctx.service.api.getApi('future_ticker');
    ctx.body = data;
  }
}

module.exports = HomeController;
