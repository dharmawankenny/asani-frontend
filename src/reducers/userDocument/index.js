// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention
import * as apiCalls from '../../api';

const LOADING = 'asani/userDocument/LOADING';
const LOAD_SUCCESS = 'asani/userDocument/LOAD_SUCCESS';
const LOAD_ERROR = 'asani/userDocument/LOAD_ERROR';

const UPLOADING = 'asani/userDocument/UPLOADING';
const UPLOADING_RESET = 'asani/userDocument/UPLOADING_RESET';
const UPLOADING_PROGRESS = 'asani/userDocument/UPLOADING_PROGRESS';
const UPLOAD_DOC_SUCCESS = 'asani/userDocument/UPLOAD_DOC_SUCCESS';
const UPLOAD_DOC_ERROR = 'asani/userDocument/UPLOAD_DOC_ERROR';

const initialState = {
  userDocuments: [],
  loading: false,
  uploadProgress: -1,
  uploadFinished: false,
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
    case UPLOADING_RESET:
      return { ...state, uploadProgress: -1, uploadFinished: false };
    case UPLOADING:
      return { ...state, uploadProgress: 0, uploadFinished: false };
    case UPLOADING_PROGRESS:
      return { ...state, uploadProgress: action.payload.progress };
    case UPLOAD_DOC_SUCCESS:
      return {
        ...state,
        userDocuments: [...state.userDocuments].map(doc => {
          if (doc.doc_code !== action.payload.docCode) {
            return doc;
          }

          return { ...doc, status: -1 };
        }),
        uploadProgress: 100,
        uploadFinished: true,
      };
    case UPLOAD_DOC_ERROR:
      return { ...state, error: action.payload.error, uploadProgress: -1, uploadFinished: true };
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

export function uploadingReset() {
  return { type: UPLOADING_RESET };
}

export function uploadingProgress(progress) {
  return { type: UPLOADING_PROGRESS, payload: { progress } };
}

export function loadSuccess(data) {
  return { type: LOAD_SUCCESS, payload: { data } };
}

export function loadError(error) {
  return { type: LOAD_ERROR, payload: { error } };
}

export function uploadDocSuccess(docCode) {
  return { type: UPLOAD_DOC_SUCCESS, payload: { docCode } };
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

export function uploadDocument(file, documentType) {
  return async dispatch => {
    dispatch(uploading());
    try {
      const response = await apiCalls.signDocument(file.name, file.type);

      if (response.data) {
        const uploadResponse = await apiCalls.uploadDocument(
          response.data.url, file, progress => dispatch(uploadingProgress(Math.round((progress.loaded * 100) / progress.total)))
        );

        if (uploadResponse) {
          const postBackendResponse = await apiCalls.postDocument(documentType, file.name);

          if (postBackendResponse && postBackendResponse.data.status && Number(postBackendResponse.data.status) === 1) {
            dispatch(uploadDocSuccess(documentType));
          }
        }
      }
    } catch (error) {
      dispatch(uploadDocError('Error Uploading Data'));
    }
  };
}
