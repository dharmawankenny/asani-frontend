// follow Ducks (https://github.com/erikras/ducks-modular-redux) convention

const LOAD = 'asani/creditScore/load';

const initialState = {
  data: null,
  loading: false,
  loaded: false,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state;
    default:
      return state;
  }
}

export function load() {
  return { type: LOAD };
}
