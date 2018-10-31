// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention
import * as apiCalls from '../../api';

const LOADING = 'asani/product/LOADING';
const LOAD_SUCCESS = 'asani/product/LOAD_SUCCESS';
const LOAD_ERROR = 'asani/product/LOAD_ERROR';

const initialState = {
  data: null,
  loading: false,
  loaded: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, data: action.payload.data, loading: false, error: null, loaded: true };
    case LOAD_ERROR:
      return { ...state, error: action.payload.error, loading: false, loaded: true };
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

export function getProducts() {
  return async dispatch => {
    dispatch(loading());
    const response = await apiCalls.getProducts();

    if (response && response.data) {
      dispatch(loadSuccess(response.data.data));
    } else {
      dispatch(loadError('Error Loading Data'));
    }
  };
}
