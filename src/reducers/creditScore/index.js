// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention
import * as apiCalls from '../../api';

const LOADING = 'asani/creditScore/LOADING';
const LOAD_SUCCESS = 'asani/creditScore/LOAD_SUCCESS';
const LOAD_ERROR = 'asani/creditScore/LOAD_ERROR';

const LOADING_SCORE_RANGE = 'asani/creditScore/LOADING_SCORE_RANGE';
const LOAD_SCORE_RANGE_SUCCESS = 'asani/creditScore/LOAD_SCORE_RANGE_SUCCESS';
const LOAD_SCORE_RANGE_ERROR = 'asani/creditScore/LOAD_SCORE_RANGE_ERROR';

const RESET_ALL = 'asani/creditScore/RESET_ALL';

const initialState = {
  data: null,
  loading: false,
  loaded: false,
  error: null,
  scoreRange: [],
  scoreRangeLoading: false,
  scoreRangeLoaded: false,
  scoreRangeError: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, data: action.payload.data, loading: false, error: null, loaded: true };
    case LOAD_ERROR:
      return { ...state, error: action.payload.error, loading: false, loaded: true };
    case LOADING_SCORE_RANGE:
      return { ...state, scoreRangeLoading: true };
    case LOAD_SCORE_RANGE_SUCCESS:
      return { ...state, scoreRange: action.payload.data, scoreRangeLoading: false, scoreRangeError: null, scoreRangeLoaded: true };
    case LOAD_SCORE_RANGE_ERROR:
      return { ...state, scoreRangeError: action.payload.error, scoreRangeLoading: false, scoreRangeLoaded: true };
    case RESET_ALL:
      return { ...initialState };
    default:
      return state;
  }
}

export function loading() {
  return { type: LOADING };
}

export function loadSuccess(data) {
  return { type: LOAD_SUCCESS, payload: { data } };
}

export function loadError(error) {
  return { type: LOAD_ERROR, payload: { error } };
}

export function loadingScoreRange() {
  return { type: LOADING_SCORE_RANGE };
}

export function loadScoreRangeSuccess(data) {
  return { type: LOAD_SCORE_RANGE_SUCCESS, payload: { data } };
}

export function loadScoreRangeError(error) {
  return { type: LOAD_SCORE_RANGE_ERROR, payload: { error } };
}

export function resetAll() {
  return { type: RESET_ALL };
}

export function getCreditScore() {
  return async dispatch => {
    dispatch(loading());
    const response = await apiCalls.getCreditScore();

    if (response && response.data) {
      dispatch(loadSuccess(response.data));
    } else {
      dispatch(loadError('Error Loading Data'));
    }
  };
}

export function getScoreRange() {
  return async dispatch => {
    dispatch(loadingScoreRange());
    const response = await apiCalls.getScoreRange();

    if (response && response.data) {
      dispatch(loadScoreRangeSuccess(response.data));
    } else {
      dispatch(loadScoreRangeError('Error Loading Data'));
    }
  };
}
