'use strict';

const mock = require('egg-mock'); // , mock, assert
// const assert = require('assert');
const mockData = require('./exchangeApi.mock.json');

describe('test/controller/exchangeApi.test.js', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });
  afterEach(mock.restore);

  it('should GET gateio', async () => {
    app.mockCsrf();
    app.mockService('api', 'gateioApi', mockData['gate.io']);
    await app.httpRequest()
      .get('/gateio')
      .expect(200)
      .expect(mockData['gate.io']);
  });

  it('should GET gateio error', async () => {
    const err = new Error('server error');
    err.status = 400;
    app.mockServiceError('api', 'gateioApi', err);
    await app.httpRequest()
      .get('/gateio')
      .expect(400)
      .expect({ error: 'server error' });
  });
});
