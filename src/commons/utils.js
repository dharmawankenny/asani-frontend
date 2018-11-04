import numeral from 'numeral';
import moment from 'moment-timezone';

import {
  DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY,
  DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY,
} from './constants';

export function calculatePercentage(score, lowerBoundary = DEFAULT_CREDIT_SCORE_LOWER_BOUNDARY, upperBoundary = DEFAULT_CREDIT_SCORE_UPPER_BOUNDARY, precise = false) {
  if (precise) {
    return ((score - lowerBoundary) / (upperBoundary - lowerBoundary)) * 100;
  }

  return Math.floor(((score - lowerBoundary) / (upperBoundary - lowerBoundary)) * 100);
}

export function printPrice(price) {
  return `Rp ${Number(price).toLocaleString('id-ID')}`;
}

export function fromNow(time) {
  return moment(time).fromNow();
}
