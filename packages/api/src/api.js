import axios, { CancelToken } from 'axios';

import cacheFactory from './cache-factory';

export default class Api {
  constructor({
    baseURL,
    headers,
    endpoints = {},
    timeout = 30000,
    adapter = cacheFactory(),
  }) {
    this.client = axios.create({
      baseURL,
      headers,
      timeout,
      adapter,
    });

    Object.keys(endpoints).forEach((endpointName) => {
      const {
        uri,
        method,
        cacheEnabled = false,
      } = endpoints[endpointName];

      this[endpointName] = ({ urlParams, config = {}, data = {} } = {}) => {
        const composedUri = getURI(uri, urlParams);
        const source = CancelToken.source();
        const requestConfig = {
          ...config,
          cancelToken: source.token,
        };

        let apiCall;

        if (['get', 'delete', 'head', 'options'].includes(method)) {
          apiCall = this.client[method](composedUri, {
            ...requestConfig,
            cacheEnabled,
          });
        } else {
          apiCall = this.client[method](composedUri, data, requestConfig);
        }

        apiCall.abort = () => source.cancel('cancel');

        return apiCall;
      };
    });
  }
}

// Uri params interpolation
function getURI(uri, params = {}) {
  const matches = uri.match(/\{([a-zA-Z0-9_]+)}/g);

  if (matches) {
    let parsedUri = uri;

    matches.forEach((match) => {
      const name = match.replace(/{?}?/g, '');

      parsedUri = parsedUri.replace(match, params[name] || '');
    });

    return parsedUri;
  }

  return uri;
}
