import MockAdapter from 'axios-mock-adapter';

import Api from '../src/api';

describe('api module', () => {
  it('creates methods based on endpoints', async () => {
    const api = new Api({
      baseURL: 'https://potato.com/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      endpoints: {
        getPotato: {
          method: 'get',
          uri: 'potato',
        },
      },
    });
    const mock = new MockAdapter(api.client);

    expect.assertions(2);
    mock.onGet('/potato').reply(200, { thisis: 'potato' });

    const res = await api.getPotato();

    expect(api.getPotato).toBeInstanceOf(Function);
    expect(res.data).toEqual({ thisis: 'potato' });
  });

  it('receives parameters in URLs', async () => {
    const api = new Api({
      baseURL: 'https://potato.com/',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      endpoints: {
        getPotato: {
          method: 'get',
          uri: 'potato/{potato}?randomico={randomico}',
        },
      },
    });
    const mock = new MockAdapter(api.client);

    expect.assertions(1);

    mock
      .onGet('/potato/algo?randomico=my_randomico')
      .reply(200, { thisis: 'potato' });

    const res = await api.getPotato({
      urlParams: {
        potato: 'algo',
        randomico: 'my_randomico',
      },
    });
    expect(res.data).toEqual({ thisis: 'potato' });
  });
});
