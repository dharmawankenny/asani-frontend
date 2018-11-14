// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention
import * as apiCalls from '../../api';

const LOADING = 'asani/product/LOADING';
const LOAD_SUCCESS = 'asani/product/LOAD_SUCCESS';
const LOAD_ERROR = 'asani/product/LOAD_ERROR';

const LOADING_DETAIL = 'asani/product/LOADING_DETAIL';
const LOAD_DETAIL_SUCCESS = 'asani/product/LOAD_DETAIL_SUCCESS';
const LOAD_DETAIL_ERROR = 'asani/product/LOAD_DETAIL_ERROR';
const RESET_DETAIL = 'asani/product/RESET_DETAIL';

const LOADING_PURCHASE = 'asani/product/LOADING_PURCHASE';
const PURCHASE_PRODUCT_SUCCESS = 'asani/product/PURCHASE_PRODUCT_SUCCESS';
const PURCHASE_PRODUCT_ERROR = 'asani/product/PURCHASE_PRODUCT_ERROR';
const RESET_PURCHASE = 'asani/product/RESET_PURCHASE';

const RESET_ALL = 'asani/product/RESET_ALL';
const PURCHASE_USER_BANNED = 'asani/product/PURCHASE_USER_BANNED';

const initialState = {
  products: [],
  detailedProduct: {},
  detailLoading: false,
  detailLoaded: false,
  detailError: null,
  purchaseLoading: null,
  purchaseLoaded: false,
  purchaseError: null,
  loading: false,
  loaded: false,
  error: null,
  userBanned: false,
};

export {initialState};

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
        console.log('ini detail product',state.detailedProduct)
        console.log('ini isinya', action.payload.data)
      return { ...state, detailedProduct: action.payload.data, detailLoading: false, detailError: null, detailLoaded: true };
    case LOAD_DETAIL_ERROR:
      return { ...state, detailError: action.payload.error, detailLoading: false, detailLoaded: true };
    case RESET_DETAIL:
      return { ...state, detailedProduct: {}, detailLoading: false, detailError: null, detailLoaded: false };
    case LOADING_PURCHASE:
      return { ...state, purchaseLoading: true, purchaseError: null, purchaseLoaded: false };
    case PURCHASE_PRODUCT_SUCCESS:
      return { ...state, purchaseLoading: false, purchaseError: null, purchaseLoaded: true };
    case PURCHASE_PRODUCT_ERROR:
      return { ...state, purchaseError: action.payload.error, purchaseLoading: false, purchaseLoaded: true };
    case PURCHASE_USER_BANNED:
      return { ...state, userBanned: true, purchaseLoading: false, purchaseLoaded: true };
    case RESET_PURCHASE:
      return { ...state, purchaseLoading: false, purchaseError: null, purchaseLoaded: false, userBanned: false };
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

export function loadingDetail() {
  return { type: LOADING_DETAIL };
}

export function loadingDetailSuccess(data) {
  return { type: LOAD_DETAIL_SUCCESS, payload: { data } };
}

export function loadingDetailError(error) {
  return { type: LOAD_DETAIL_ERROR, payload: { error } };
}

export function purchaseUserBanned(error) {
  return { type: PURCHASE_USER_BANNED, payload: { error } };
}

export function resetDetail() {
  return { type: RESET_DETAIL };
}

export function loadingPurchase() {
  return { type: LOADING_PURCHASE };
}

export function purchaseProductSuccess(data) {
  return { type: PURCHASE_PRODUCT_SUCCESS, payload: { data } };
}

export function purchaseProductError(error) {
  return { type: PURCHASE_PRODUCT_ERROR, payload: { error } };
}

export function resetPurchase() {
  return { type: RESET_PURCHASE };
}

export function resetAll() {
  return { type: RESET_ALL };
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

export function purchaseProduct(productId) {
  return async dispatch => {
    dispatch(loadingPurchase());
    const response = await apiCalls.postLoan(productId);
    if (response.data.status === -1) {
      dispatch(purchaseUserBanned('Error Purchasing Product'));
      // swal({
      //   text: 'Mohon maaf, sepertinya sedang ada gangguang pada sistem kami, terima kasih atas kesabaran dan pengertiannya.',
      //   icon: 'error',
      // });
    } else if (response && response.data && response.data.status === 1) {
      dispatch(purchaseProductSuccess(response.data));
    } else {
      dispatch(purchaseProductError('Error Purchasing Product'));
    }
  };
}
