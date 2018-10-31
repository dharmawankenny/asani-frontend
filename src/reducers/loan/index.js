// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention
import * as apiCalls from '../../api';

const LOADING = 'asani/loan/LOADING';
const LOAD_SUCCESS = 'asani/loan/LOAD_SUCCESS';
const LOAD_ERROR = 'asani/loan/LOAD_ERROR';
const LOADING_ACTIVE = 'asani/loan/LOADING_ACTIVE';
const LOAD_ACTIVE_SUCCESS = 'asani/loan/LOAD_ACTIVE_SUCCESS';
const LOAD_ACTIVE_ERROR = 'asani/loan/LOAD_ACTIVE_ERROR';
const LOADING_DETAIL = 'asani/loan/LOADING_DETAIL';
const LOAD_DETAIL_SUCCESS = 'asani/loan/LOAD_DETAIL_SUCCESS';
const LOAD_DETAIL_ERROR = 'asani/loan/LOAD_DETAIL_ERROR';
const RESET_DETAIL = 'asani/loan/RESET_DETAIL';

const initialState = {
  loans: [],
  activeLoans: [],
  detailedLoan: {},
  loading: false,
  loaded: false,
  activeLoansLoading: false,
  activeLoansLoaded: false,
  activeLoansError: null,
  detailLoading: false,
  detailLoaded: false,
  detailError: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true, error: null, loaded: false };
    case LOAD_SUCCESS:
      return { ...state, loans: action.payload.data, loading: false, error: null, loaded: true };
    case LOAD_ERROR:
      return { ...state, error: action.payload.error, loading: false, loaded: true };
    case LOADING_ACTIVE:
      return { ...state, activeLoansLoading: true, activeLoansError: null, activeLoansLoaded: false };
    case LOAD_ACTIVE_SUCCESS:
      return { ...state, activeLoans: action.payload.data, activeLoansLoading: false, activeLoansError: null, activeLoansLoaded: true };
    case LOAD_ACTIVE_ERROR:
      return { ...state, activeLoansError: action.payload.error, activeLoansLoading: false, activeLoansLoaded: true };
    case LOADING_DETAIL:
      return { ...state, detailLoading: true, detailError: null, detailLoaded: false };
    case LOAD_DETAIL_SUCCESS:
      return { ...state, detailedLoan: action.payload.data, detailLoading: false, detailError: null, detailLoaded: true };
    case LOAD_DETAIL_ERROR:
      return { ...state, detailError: action.payload.error, detailLoading: false, detailLoaded: true };
    case RESET_DETAIL:
      return { ...state, detailedLoan: {}, detailLoading: false, detailError: null, detailLoaded: false };
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

export function loadingActive() {
  return { type: LOADING_ACTIVE };
}

export function loadActiveSuccess(data) {
  return { type: LOAD_ACTIVE_SUCCESS, payload: { data } };
}

export function loadActiveError(error) {
  return { type: LOAD_ACTIVE_ERROR, payload: { error } };
}

export function loadingDetail() {
  return { type: LOADING_DETAIL };
}

export function loadingDetailSuccess(data) {
  return { type: LOAD_DETAIL_SUCCESS, payload: { data } };
}

export function loadingDetailError(error) {
  return { type: LOAD_DETAIL_ERROR, payload: { error } };
}

export function resetDetail() {
  return { type: RESET_DETAIL };
}

export function getLoans() {
  return async dispatch => {
    dispatch(loading());
    const response = await apiCalls.getLoans(0);

    if (response && response.data) {
      dispatch(loadSuccess(response.data));
    } else {
      dispatch(loadError('Error Loading Data'));
    }
  };
}

export function getActiveLoans() {
  return async dispatch => {
    dispatch(loadingActive());
    const response = await apiCalls.getLoans(1);

    if (response && response.data) {
      dispatch(loadActiveSuccess(response.data));
    } else {
      dispatch(loadActiveError('Error Loading Data'));
    }
  };
}

export function getLoanDetail(loanId) {
  return async dispatch => {
    dispatch(loadingDetail());
    const response = await apiCalls.getLoanDetail(loanId);

    if (response && response.data) {
      dispatch(loadingDetailSuccess(response.data));
    } else {
      dispatch(loadingDetailError('Error Loading Data'));
    }
  };
}
