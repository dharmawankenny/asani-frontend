// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention
import * as apiCalls from '../../api';

const LOADING = 'asani/userDocument/LOADING';
const LOAD_SUCCESS = 'asani/userDocument/LOAD_SUCCESS';
const LOAD_ERROR = 'asani/userDocument/LOAD_ERROR';

const UPLOADING = 'asani/userDocument/UPLOADING';
const UPLOAD_DOC_SUCCESS = 'asani/userDocument/UPLOAD_DOC_SUCCESS';
const UPLOAD_DOC_ERROR = 'asani/userDocument/UPLOAD_DOC_ERROR';

const initialState = {
  userDocuments: [],
  loading: false,
  uploading: false,
  uploadProgress: 0,
  loaded: false,
  error: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, userDocuments: action.payload.data, loading: false, error: null, loaded: true };
    case LOAD_ERROR:
      return { ...state, error: action.payload.error, loading: false, loaded: true };
    default:
      return state;
  }
}

export function loading() {
  return { type: LOADING };
}

export function uploading() {
  return { type: UPLOADING };
}

export function loadSuccess(data) {
  return { type: LOAD_SUCCESS, payload: { data } };
}

export function loadError(error) {
  return { type: LOAD_ERROR, payload: { error } };
}

export function uploadDocSuccess(data) {
  return { type: UPLOAD_DOC_SUCCESS, payload: { data } };
}

export function uploadDocError(error) {
  return { type: UPLOAD_DOC_ERROR, payload: { error } };
}

export function getDocuments() {
  return async dispatch => {
    dispatch(loading());
    const response = await apiCalls.getDocuments();

    if (response && response.data) {
      dispatch(loadSuccess(response.data));
    } else {
      dispatch(loadError('Error Loading Data'));
    }
  };
}

export function uploadDocument(file) {
  return async dispatch => {
    dispatch(uploading());
    const response = await apiCalls.signDocument(file.name, file.type);
    console.log(response);
    console.log(file);

    if (response && response.data && response.data.url) {
      const uploadResponse = await apiCalls.uploadDocument(response.data.url, file, progress => console.log(progress));

      if (uploadResponse && uploadResponse.data) {
        dispatch(uploadDocSuccess(uploadResponse.data));
      } else {
        dispatch(uploadDocError('Error Loading Data'));
      }
    } else {
      dispatch(uploadDocError('Error Loading Data'));
    }
  };
}
