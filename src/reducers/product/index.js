// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention
import * as apiCalls from '../../api';

const LOADING = 'asani/product/LOADING';
const LOAD_SUCCESS = 'asani/product/LOAD_SUCCESS';
const LOAD_ERROR = 'asani/product/LOAD_ERROR';
const LOADING_DETAIL = 'asani/product/LOADING_DETAIL';
const LOAD_DETAIL_SUCCESS = 'asani/product/LOAD_DETAIL_SUCCESS';
const LOAD_DETAIL_ERROR = 'asani/product/LOAD_DETAIL_ERROR';
const RESET_DETAIL = 'asani/product/RESET_DETAIL';

const initialState = {
  products: [],
  detailedProduct: {},
  detailLoading: false,
  detailLoaded: false,
  detailError: null,
  loading: false,
  loaded: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, products: action.payload.data, loading: false, error: null, loaded: true };
    case LOAD_ERROR:
      return { ...state, error: action.payload.error, loading: false, loaded: true };
    case LOADING_DETAIL:
      return { ...state, detailLoading: true, detailError: null, detailLoaded: false };
    case LOAD_DETAIL_SUCCESS:
      return { ...state, detailedProduct: action.payload.data, detailLoading: false, detailError: null, detailLoaded: true };
    case LOAD_DETAIL_ERROR:
      return { ...state, detailError: action.payload.error, detailLoading: false, detailLoaded: true };
    case RESET_DETAIL:
      return { ...state, detailedProduct: {}, detailLoading: false, detailError: null, detailLoaded: false };
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

export function getProducts() {
  return async dispatch => {
    dispatch(loading());
    const response = await apiCalls.getProducts();

    if (response && response.data) {
      if (response.data.data) {
        dispatch(loadSuccess(response.data.data));
      } else {
        dispatch(loadSuccess(response.data));
      }
    } else {
      dispatch(loadError('Error Loading Data'));
    }
  };
}

export function getProductDetail(productId) {
  return async dispatch => {
    dispatch(loadingDetail());
    const response = await apiCalls.getProductDetail(productId);

    if (response && response.data) {
      if (response.data.data) {
        dispatch(loadingDetailSuccess(response.data.data));
      } else {
        dispatch(loadingDetailSuccess(response.data));
      }
    } else {
      dispatch(loadingDetailError('Error Loading Data'));
    }
  };
}
