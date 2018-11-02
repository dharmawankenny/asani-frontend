import numeral from 'numeral';
import moment from 'moment-timezone';

import {
  DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY,
  DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY,
} from './constants';

export function calculatePercentage(score) {
  return Math.floor(((score - DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY) / (DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY - DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY)) * 100);
}

export function printPrice(price) {
  return `Rp ${Number(price).toLocaleString('id-ID')}`;
}

export function fromNow(time) {
  return moment(time).locale('id').fromNow();
}