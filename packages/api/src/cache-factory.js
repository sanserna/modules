import axios from 'axios';
import LRU from 'lru-cache';
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

const MAX_ITEMS = 100;
const FIVE_MINUTES = 5 * 60 * 1000;

export default ({
  max = MAX_ITEMS,
  maxAge = FIVE_MINUTES,
  cacheFlag = 'cacheEnabled',
  enabledByDefault = false,
}) => throttleAdapterEnhancer(
  cacheAdapterEnhancer(axios.defaults.adapter, {
    cacheFlag,
    enabledByDefault,
    defaultCache: new LRU({ max, maxAge }),
  }),
);
